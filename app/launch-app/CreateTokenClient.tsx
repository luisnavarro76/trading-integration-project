"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import { toast } from "sonner";
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Rocket,
  Upload,
  Copy,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeChatHeader } from "@/components/HomeChatHeader";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  appUrl: z.string().url({ message: "Please enter a valid URL" }),
  appName: z
    .string()
    .min(2, { message: "App name must be at least 2 characters" }),
  description: z.string().optional(),
  videoSource: z.string().optional(),
  videoUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Please enter a valid video URL",
    ),
  appLogo: z
    .any()
    .refine((f) => typeof File !== "undefined" && f instanceof File, {
      message: "App logo is required",
    })
    .refine((f) => !(f instanceof File) || f.size <= 2 * 1024 * 1024, {
      message: "Max file size is 2MB",
    })
    .refine((f) => !(f instanceof File) || f.type.startsWith("image/"), {
      message: "Logo must be an image",
    }),
  tokenName: z
    .string()
    .min(2, { message: "Token name must be at least 2 characters" }),
  erc20Name: z
    .string()
    .min(2, { message: "ERC20 name must be at least 2 characters" }),
  erc20Symbol: z
    .string()
    .min(2, { message: "ERC20 symbol must be at least 2 characters" })
    .max(10, { message: "ERC20 symbol must be at most 10 characters" }),
  xHandle: z.string().optional(),
  isXConnected: z.boolean().default(false),
  useImmediateStart: z.boolean().default(true),
  launchDate: z.string().optional(),
  launchTime: z.string().optional(),
  communityWallet: z
    .string()
    .min(1, { message: "Community wallet address is required" })
    .refine(
      (value) => /^0x[a-fA-F0-9]{40}$/.test(value),
      "Please enter a valid Ethereum address (0x followed by 40 hex characters)",
    ),
}).refine(
  (data) => {
    if (!data.useImmediateStart) {
      if (!data.launchDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.launchDate)) {
        return false;
      }
      if (!data.launchTime || data.launchTime.trim() === "") {
        return false;
      }
    }
    return true;
  },
  {
    message: "Launch date and time are required when scheduling a launch",
    path: ["launchDate"], // Show error on launchDate field
  }
);

const steps = [
  { id: 1, title: "Identity" },
  { id: 2, title: "Token" },
  { id: 3, title: "Launch" },
];

const TIME_OPTIONS = Array.from({ length: 24 * 4 }, (_, i) => {
  const minutes = i * 15;
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  return `${hh}:${mm}`;
});

const DEFAULT_TOKEN_NETWORK = "base";
const DEFAULT_TOKEN_SUPPLY = "1000000";
const DEFAULT_TOKEN_DECIMALS = "18";

const compressImage = (
  file: File,
  maxWidth = 512,
  quality = 0.8,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxWidth) {
        width = (width * maxWidth) / height;
        height = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        resolve(file); // Fallback to original
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressedFile.size < file.size ? compressedFile : file);
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};

export default function CreateTokenClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const disableDraftPersistenceRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftLoadedRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();

  const blankDraftValues = {
    appUrl: "",
    appName: "",
    description: "",
    videoSource: "youtube",
    videoUrl: "",
    tokenName: "",
    erc20Name: "",
    erc20Symbol: "",
    xHandle: "",
    isXConnected: false,
    useImmediateStart: true,
    launchDate: "",
    launchTime: "",
    communityWallet: "",
    appLogo: undefined,
  } satisfies Partial<z.infer<typeof formSchema>>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: blankDraftValues,
  });

  const appLogo = form.watch("appLogo");
  const logoPreviewUrl = React.useMemo(() => {
    if (appLogo instanceof File) {
      return URL.createObjectURL(appLogo);
    }
    return "";
  }, [appLogo]);
  const draftStorageKey = "vibefund-create-token-draft";
  const userIdCookieName =
    process.env.NEXT_PUBLIC_AUTH_USER_ID_COOKIE_NAME ?? "vibefund_user_id";
  const userIdCookieFallbackName =
    process.env.AUTH_USER_ID_COOKIE_NAME ?? "vibefund_user_id";

  const readCookieValue = (name: string) => {
    if (typeof document === "undefined") return "";
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${escaped}=([^;]*)`),
    );
    return match ? decodeURIComponent(match[1]) : "";
  };

  const readFirstCookie = (names: string[]) => {
    for (const name of names) {
      const value = readCookieValue(name);
      if (value) return value;
    }
    return "";
  };

  const twitterHandleCookieNames = [
    "vibefund_x_handle",
    "x_handle",
    "twitter_handle",
    "app_x_handle",
  ];
  const twitterConnectedCookieNames = [
    "vibefund_x_connected",
    "x_connected",
    "twitter_connected",
  ];

  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const [isTwitterConnecting, setIsTwitterConnecting] = useState(false);
  const [twitterError, setTwitterError] = useState("");
  const twitterPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const twitterPopupRef = useRef<Window | null>(null);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);

  const updateTwitterFromCookies = () => {
    const handle = readFirstCookie(twitterHandleCookieNames);
    const isConnected =
      readFirstCookie(twitterConnectedCookieNames) || (handle ? "1" : "");
    if (!handle && !isConnected) return false;
    const normalized = handle.startsWith("@") ? handle : `@${handle}`;
    form.setValue("xHandle", normalized, {
      shouldDirty: true,
      shouldTouch: true,
    });
    form.setValue("isXConnected", true);
    return true;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkXData = () => {
      try {
        const data = localStorage.getItem("vibefund_x_connected_data");
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.timestamp && Date.now() - parsed.timestamp < 60000) {
            const { handle } = parsed;
            if (handle) {
              const normalized = handle.startsWith("@") ? handle : `@${handle}`;
              form.setValue("xHandle", normalized, {
                shouldDirty: true,
                shouldTouch: true,
              });
              form.setValue("isXConnected", true);
              localStorage.removeItem("vibefund_x_connected_data");
            }
          } else {
            localStorage.removeItem("vibefund_x_connected_data");
          }
        }
      } catch {
      }
    };
    checkXData();
  }, []);

  useEffect(() => {
    if (!logoPreviewUrl) return;
    return () => {
      URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  useEffect(() => {
    if (!mounted || draftLoadedRef.current) return;
    draftLoadedRef.current = true;
    try {
      const raw = localStorage.getItem(draftStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        version?: number;
        currentStep?: number;
        updatedAt?: number;
        values?: Partial<z.infer<typeof formSchema>>;
      };

      if (typeof parsed?.updatedAt === "number") {
        const maxAgeMs = 1000 * 60 * 60 * 24 * 7; // 7 days
        if (Date.now() - parsed.updatedAt > maxAgeMs) {
          localStorage.removeItem(draftStorageKey);
          return;
        }
      }
      if (parsed?.values) {
        form.reset({
          ...blankDraftValues,
          ...parsed.values,
          appLogo: undefined,
        });
      }
      if (typeof parsed?.currentStep === "number") {
        setCurrentStep(Math.min(Math.max(parsed.currentStep, 1), 3));
      }
    } catch {
      localStorage.removeItem(draftStorageKey);
    }
  }, [mounted, form]);

  const currentStepRef = useRef(currentStep);
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (!mounted) return;
    const subscription = form.watch(() => {
      if (disableDraftPersistenceRef.current) return;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        if (disableDraftPersistenceRef.current) return;
        const { appLogo: _appLogo, ...rest } = form.getValues();
        const payload = {
          version: 1,
          currentStep: currentStepRef.current,
          updatedAt: Date.now(),
          values: rest,
        };
        localStorage.setItem(draftStorageKey, JSON.stringify(payload));
      }, 250);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [mounted]);

  useEffect(() => {
    if (!ready) return;
    if (authenticated) return;
    login().catch(() => null);
  }, [ready, authenticated, login]);

  useEffect(() => {
    const appUrl = searchParams.get("appUrl")?.trim();
    if (!appUrl) return;
    if (form.getValues("appUrl")) return;
    form.setValue("appUrl", appUrl, { shouldDirty: true, shouldTouch: true });
  }, [searchParams, form]);

  useEffect(() => {
    const paramHandle =
      searchParams.get("x_handle") ??
      searchParams.get("xHandle") ??
      searchParams.get("twitter_handle");
    if (paramHandle) {
      const normalized = paramHandle.startsWith("@")
        ? paramHandle
        : `@${paramHandle}`;
      form.setValue("xHandle", normalized, {
        shouldDirty: true,
        shouldTouch: true,
      });
      form.setValue("isXConnected", true);
      setIsTwitterModalOpen(false);
      setIsTwitterConnecting(false);
    } else {
      updateTwitterFromCookies();
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (twitterPollRef.current) {
        clearInterval(twitterPollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "VIBEFUND_X_CONNECTED") {
        const { handle } = event.data.payload || {};
        if (handle) {
          const normalized = handle.startsWith("@") ? handle : `@${handle}`;
          form.setValue("xHandle", normalized, {
            shouldDirty: true,
            shouldTouch: true,
          });
          form.setValue("isXConnected", true);
          setIsTwitterConnecting(false);
          setIsTwitterModalOpen(false);

          if (twitterPollRef.current) {
            clearInterval(twitterPollRef.current);
            twitterPollRef.current = null;
          }

          if (twitterPopupRef.current && !twitterPopupRef.current.closed) {
            try {
              twitterPopupRef.current.close();
            } catch {
            }
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [form]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "vibefund_x_connected_data" && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          const { handle } = data;
          if (handle) {
            const normalized = handle.startsWith("@") ? handle : `@${handle}`;
            form.setValue("xHandle", normalized, {
              shouldDirty: true,
              shouldTouch: true,
            });
            form.setValue("isXConnected", true);
            setIsTwitterConnecting(false);
            setIsTwitterModalOpen(false);

            if (twitterPollRef.current) {
              clearInterval(twitterPollRef.current);
              twitterPollRef.current = null;
            }

            if (twitterPopupRef.current && !twitterPopupRef.current.closed) {
              try {
                twitterPopupRef.current.close();
              } catch {
              }
            }

            localStorage.removeItem("vibefund_x_connected_data");
          }
        } catch {
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [form]);

  const checkLocalStorageForXConnection = React.useCallback(() => {
    try {
      const data = localStorage.getItem("vibefund_x_connected_data");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 60000) {
          const { handle } = parsed;
          if (handle) {
            const normalized = handle.startsWith("@") ? handle : `@${handle}`;
            form.setValue("xHandle", normalized, {
              shouldDirty: true,
              shouldTouch: true,
            });
            form.setValue("isXConnected", true);
            localStorage.removeItem("vibefund_x_connected_data");
            return true;
          }
        } else {
          localStorage.removeItem("vibefund_x_connected_data");
        }
      }
    } catch {
    }
    return false;
  }, [form]);

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await form.trigger(["appUrl", "appName", "appLogo"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["tokenName"]);
    } else {
      isValid = true;
    }

    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getLaunchTimestamp = (launchDate: string, launchTime: string): number => {
    const timeParts = launchTime.split(":");
    const hours = timeParts[0] || "00";
    const minutes = timeParts[1] || "00";
    const seconds = timeParts[2] || "00";
    const dateTimeString = `${launchDate}T${hours}:${minutes}:${seconds}Z`;
    const date = new Date(dateTimeString);
    
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date/time: ${launchDate} ${launchTime}`);
    }
    
    return Math.floor(date.getTime() / 1000);
  };

  const PRESALE_FACTORY_ABI = [
    "function createPresale(string memory tokenName, string memory tokenSymbol, address communityWallet, address vesting, uint256 startTime) external returns (address)",
    "event PresaleCreated(uint256 indexed presaleId, address indexed crowdfundAddress, address indexed creator)"
  ];

  const callCreatePresale = async (
    tokenName: string,
    tokenSymbol: string,
    communityWallet: string,
    vestingAddress: string,
    startTime: number
  ): Promise<{ transactionHash: string; presaleId: number; crowdfundAddress: string; creator: string }> => {
    const wallet = wallets[0];
    if (!wallet) {
      throw new Error("No wallet connected");
    }

    const factoryAddress = process.env.NEXT_PUBLIC_PRESALE_FACTORY_ADDRESS;
    if (!factoryAddress) {
      throw new Error("NEXT_PUBLIC_PRESALE_FACTORY_ADDRESS is not set in environment variables");
    }

    const provider = await wallet.getEthereumProvider();
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const factoryContract = new ethers.Contract(
      factoryAddress,
      PRESALE_FACTORY_ABI,
      signer
    );

    toast.info("Confirm transaction in your wallet...");
    
    const txResponse = await factoryContract.createPresale(
      tokenName,
      tokenSymbol,
      communityWallet,
      vestingAddress,
      startTime
    );

    console.log("📝 Transaction response received:", {
      type: typeof txResponse,
      hasHash: !!(txResponse as any)?.hash,
      hasWait: typeof (txResponse as any)?.wait === "function",
    });

    let txHash: string | undefined = (txResponse as any)?.hash;
    
    if (txHash) {
      console.log("✅ Transaction hash (immediate):", txHash);
      toast.info("Transaction submitted. Waiting for confirmation...", {
        description: `Tx: ${txHash.substring(0, 10)}...`,
      });
    } else {
      console.log("⏳ Transaction hash not available immediately, waiting for receipt...");
      toast.info("Transaction submitted. Waiting for confirmation...");
    }

    const receipt = await txResponse.wait();
    console.log("✅ Transaction receipt received:", {
      status: receipt.status,
      hash: receipt.hash || (receipt as any)?.transactionHash,
      blockNumber: receipt.blockNumber,
      logs: receipt.logs?.length || 0,
    });
    
    const confirmedHash = receipt.hash || (receipt as any)?.transactionHash || txHash;
    
    if (!confirmedHash) {
      throw new Error("Transaction hash not available from receipt or transaction");
    }
    
    if (receipt.status !== 1) {
      throw new Error("Transaction failed - receipt status is 0");
    }

    console.log("🔍 Parsing PresaleCreated event from receipt logs...");
    let presaleId: number = 0;
    let crowdfundAddress: string = "";
    let creator: string = "";

    try {
      const iface = factoryContract.interface;
      const presaleCreatedEvent = iface.getEvent("PresaleCreated");
      
      for (const log of receipt.logs) {
        try {
          const parsedLog = iface.parseLog(log);
          if (parsedLog && parsedLog.name === "PresaleCreated") {
            presaleId = Number(parsedLog.args.presaleId);
            crowdfundAddress = parsedLog.args.crowdfundAddress;
            creator = parsedLog.args.creator;
            console.log("✅ PresaleCreated event parsed:", {
              presaleId,
              crowdfundAddress,
              creator,
            });
            break;
          }
        } catch (parseError) {
          continue;
        }
      }

      if (!crowdfundAddress) {
        console.warn("⚠️ PresaleCreated event not found in receipt logs");
        throw new Error("PresaleCreated event not found in transaction receipt");
      }
    } catch (error: any) {
      console.error("❌ Failed to parse PresaleCreated event:", error);
      throw new Error(`Failed to parse PresaleCreated event: ${error.message}`);
    }
    
    console.log("✅ Transaction confirmed with hash:", confirmedHash);
    toast.success("Presale created successfully!", {
      description: `Transaction confirmed: ${confirmedHash.substring(0, 10)}...`,
    });
    
    return {
      transactionHash: confirmedHash,
      presaleId,
      crowdfundAddress,
      creator,
    };
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 Form submission started");
    
    if (isSubmittingRef.current) {
      console.log("⚠️ Already submitting, skipping...");
      return;
    }
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    try {
      console.log("🔍 Checking wallet connection...");
      if (!authenticated || wallets.length === 0) {
        console.error("❌ Wallet not connected");
        toast.error("Please connect your wallet first");
        login();
        return;
      }
      console.log("✅ Wallet connected");

      console.log("🔍 Checking environment variables...");
      const vestingAddress = process.env.NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS;
      if (!vestingAddress) {
        console.error("❌ Vesting contract address not configured");
        toast.error("Vesting contract address not configured");
        return;
      }
      console.log("✅ Vesting address:", vestingAddress);

      const factoryAddress = process.env.NEXT_PUBLIC_PRESALE_FACTORY_ADDRESS;
      if (!factoryAddress) {
        console.error("❌ Presale factory contract address not configured");
        toast.error("Presale factory contract address not configured");
        return;
      }
      console.log("✅ Factory address:", factoryAddress);

      const startTime = values.useImmediateStart
        ? 0
        : getLaunchTimestamp(values.launchDate || "", values.launchTime || "");
      console.log("✅ Start time calculated:", startTime, values.useImmediateStart ? "(immediate)" : "(scheduled)");

      console.log("📝 Calling createPresale contract...");
      let transactionHash: string | null = null;
      let presaleId: number | null = null;
      let crowdfundAddress: string | null = null;
      let creator: string | null = null;
      try {
        const result = await callCreatePresale(
          values.erc20Name,
          values.erc20Symbol,
          values.communityWallet,
          vestingAddress,
          startTime
        );
        transactionHash = result.transactionHash;
        presaleId = result.presaleId;
        crowdfundAddress = result.crowdfundAddress;
        creator = result.creator;
        console.log("✅ Contract transaction successful, hash:", transactionHash);
        console.log("✅ Presale event data:", {
          presaleId,
          crowdfundAddress,
          creator,
        });
      } catch (error: any) {
        console.error("❌ Contract call failed:", error);
        console.error("Error details:", {
          message: error?.message,
          code: error?.code,
          data: error?.data,
        });
        toast.error("Failed to create presale", {
          description: error?.message || "Transaction rejected or failed. Please try again.",
        });
        return;
      }

      if (!transactionHash) {
        console.error("❌ Transaction hash not available");
        toast.error("Transaction hash not available");
        return;
      }
      
      console.log("✅ Transaction hash received:", transactionHash);
      if (!crowdfundAddress || !presaleId || !creator) {
        console.warn("⚠️ Some event data not available:", {
          presaleId: presaleId ?? "missing",
          crowdfundAddress: crowdfundAddress ?? "missing",
          creator: creator ?? "missing",
        });
      }

      const body = new FormData();
      body.set("transaction_hash", transactionHash);
      body.set("start_time", startTime.toString());
      
      if (!values.useImmediateStart) {
        if (values.launchDate) {
          body.set("launch_date", values.launchDate);
        }
        if (values.launchTime) {
          body.set("launch_time", values.launchTime);
        }
      }
      
      if (presaleId !== null) {
        body.set("presale_id", presaleId.toString());
      }
      if (crowdfundAddress) {
        body.set("crowdfund_address", crowdfundAddress);
      }
      if (creator) {
        body.set("creator", creator);
      }
      
      body.set("app_name", values.appName);
      body.set("app_link", values.appUrl);
      body.set("app_logo", values.appLogo);
      body.set("description", values.description || "");
      body.set("app_video_url", values.videoUrl?.trim() || "");
      
      body.set("ticker_name", values.tokenName);
      body.set("erc20_name", values.erc20Name);
      body.set("erc20_symbol", values.erc20Symbol);
      body.set("network", DEFAULT_TOKEN_NETWORK);
      body.set("total_supply", DEFAULT_TOKEN_SUPPLY);
      body.set("decimals", DEFAULT_TOKEN_DECIMALS);
      
      body.set("community_wallet", values.communityWallet);
      
      body.set("is_x_connected", values.isXConnected ? "1" : "0");
      body.set("app_x_handle", values.xHandle || "");
      
      let userId = readFirstCookie([
        userIdCookieName,
        userIdCookieFallbackName,
        "vibefund_user_id",
        "user_id",
      ]);
      
      const hasUserIdCookie = userId && userId.trim().length > 0;
      
      if (!hasUserIdCookie && wallets.length > 0 && wallets[0].address) {
        userId = wallets[0].address;
        console.log("⚠️ User ID cookie not found, using wallet address as user_id:", userId);
      }
      
      console.log("🍪 All cookies:", document.cookie);
      console.log("🍪 Checking cookies:", {
        userIdCookieName,
        userIdCookieFallbackName,
        cookieValue: readCookieValue(userIdCookieName),
        fallbackValue: readCookieValue(userIdCookieFallbackName),
        vibefundValue: readCookieValue("vibefund_user_id"),
        user_idValue: readCookieValue("user_id"),
      });
      console.log("👤 User ID found:", userId || "NOT FOUND");
      console.log("👤 Wallet address:", wallets[0]?.address || "NOT AVAILABLE");

      if (!userId || userId.trim().length === 0) {
        console.error("❌ No user_id available - neither cookie nor wallet address");
        toast.error("User identification failed", {
          description: "Please sign in or connect your wallet",
        });
        return;
      }
      
      body.set("user_id", userId);
      console.log("✅ User ID set in FormData:", userId);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      
      console.log("📤 Preparing to send FormData to backend...");
      console.log("Backend URL:", backendUrl);
      console.log("FormData fields:", {
        transaction_hash: transactionHash,
        presale_id: presaleId ?? "not set",
        crowdfund_address: crowdfundAddress || "not set",
        creator: creator || "not set",
        app_name: values.appName,
        ticker_name: values.tokenName,
        erc20_name: values.erc20Name,
        erc20_symbol: values.erc20Symbol,
        community_wallet: values.communityWallet,
        launch_date: values.launchDate,
        launch_time: values.launchTime,
        start_time: startTime.toString(),
        user_id: userId || "not set",
        has_logo: !!values.appLogo,
      });
      
      console.log("🌐 Making POST request to:", `${backendUrl}/api/presales`);
      
      const res = await fetch(`${backendUrl}/api/presales`, {
        method: "POST",
        body,
      });
      
      console.log("📥 Response received:", {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
      });

      const data = await res.json().catch((err) => {
        console.error("Failed to parse JSON response:", err);
        return { error: "Invalid response from server" };
      });
      
      if (!res.ok) {
        const errorMessage = (data as any)?.error || "Failed to save presale data";
        const errorDetails = (data as any)?.details || "";
        console.error("❌ Backend error:", {
          status: res.status,
          error: errorMessage,
          details: errorDetails,
          fullResponse: data,
        });
        toast.error("Failed to submit", {
          description: errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage,
        });
        return;
      }
      
      console.log("✅ Backend response:", data);

      disableDraftPersistenceRef.current = true;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }

      toast.success("Submitted", {
        description: data?.message ?? "Presale created successfully",
      });

      console.log("✅ Success! Clearing form and navigating...");
        localStorage.removeItem(draftStorageKey);
        form.reset(blankDraftValues);
        setCurrentStep(1);
      
      if (data?.data?.id) {
        console.log("📍 Navigating to presale page:", data.data.id);
        router.replace(`/presale/${data.data.id}`);
      } else {
        console.log("📍 Navigating to home");
        router.replace("/");
      }
    } catch (error: any) {
      console.error("❌ Error in onSubmit (outer catch):", error);
    } finally {
      console.log("🏁 Form submission finished, resetting state");
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  }

  const descriptionPresets = [
    {
      label: "Product Pitch",
      value:
        "A clear, friendly one-liner about what your app does, who it is for, and why it matters. Highlight the main outcome users get in a single sentence.",
    },
    {
      label: "Community Story",
      value:
        "Describe the mission, the people you are building for, and the behavior you want to encourage. Keep it short, human, and benefit-led.",
    },
    {
      label: "Utility Summary",
      value:
        "Explain the core utility of the token and how it connects to your app. Keep it concrete and focus on real usage.",
    },
  ];

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ??
    "https://backend.vibefund.ing/api";

  const startTwitterConnect = () => {
    const userId = readFirstCookie([
      userIdCookieName,
      userIdCookieFallbackName,
      "vibefund_user_id",
      "user_id",
    ]);
    if (!userId) {
      setTwitterError("Connect wallet first to get a user id.");
      return;
    }

    setTwitterError("");
    setIsTwitterConnecting(true);

    const url = `${backendBaseUrl}/twitter/auth/login?user_id=${encodeURIComponent(
      userId,
    )}`;
    const popup = window.open(url, "vibefund-twitter", "width=520,height=640");

    if (!popup) {
      setIsTwitterConnecting(false);
      setTwitterError("Popup blocked. Please allow popups and try again.");
      return;
    }

    twitterPopupRef.current = popup;

    if (twitterPollRef.current) {
      clearInterval(twitterPollRef.current);
    }

    const start = Date.now();
    twitterPollRef.current = setInterval(() => {
      if (checkLocalStorageForXConnection()) {
        setIsTwitterConnecting(false);
        setIsTwitterModalOpen(false);
        if (twitterPollRef.current) {
          clearInterval(twitterPollRef.current);
          twitterPollRef.current = null;
        }
        try {
          popup.close();
        } catch {
        }
        return;
      }

      if (popup.closed) {
        const done =
          updateTwitterFromCookies() || checkLocalStorageForXConnection();
        if (done) {
          setIsTwitterConnecting(false);
          setIsTwitterModalOpen(false);
        } else {
          setIsTwitterConnecting(false);
        }
        if (twitterPollRef.current) {
          clearInterval(twitterPollRef.current);
          twitterPollRef.current = null;
        }
        return;
      }

      const done = updateTwitterFromCookies();
      if (done) {
        setIsTwitterConnecting(false);
        setIsTwitterModalOpen(false);
        if (twitterPollRef.current) {
          clearInterval(twitterPollRef.current);
          twitterPollRef.current = null;
        }
        try {
          popup.close();
        } catch {
        }
        return;
      }

      if (Date.now() - start > 2 * 60 * 1000) {
        setIsTwitterConnecting(false);
        setTwitterError("Timed out. Please try again.");
        if (twitterPollRef.current) {
          clearInterval(twitterPollRef.current);
          twitterPollRef.current = null;
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-[#EC4E02] selection:text-white">
      <main className="flex-1 flex flex-col relative">
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
          <div className="absolute top-0 right-20 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
        </div>

        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-16 relative z-10 bg-[#050505]/50 backdrop-blur-sm min-h-screen items-center">
          <div className="mb-12 lg:mb-20">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-full border px-4 py-2 transition-all",
                    step.id === currentStep
                      ? "border-[#EC4E02] bg-[#EC4E02]/10"
                      : "border-white/10 hover:border-white/30",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border text-sm font-bold transition-all",
                      step.id === currentStep
                        ? "border-[#EC4E02] text-[#EC4E02] bg-[#EC4E02]/10"
                        : step.id < currentStep
                          ? "border-[#EC4E02] bg-[#EC4E02] text-white"
                          : "border-white/10 text-white/40",
                    )}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold uppercase tracking-wider",
                      step.id === currentStep
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/70",
                    )}
                  >
                    {step.title}
                  </span>
                  {index !== steps.length - 1 && (
                    <span className="hidden sm:inline-flex h-px w-6 bg-white/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-4xl w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={checkKeyDown}
                className="h-full flex flex-col"
              >
                <div>
                  {currentStep === 1 && (
                    <div className="space-y-10">
                      <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                          Project Identity
                        </h1>
                        <p className="text-white/50 text-lg">
                          Define the core presence of your application.
                        </p>
                      </div>

                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="appName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Application Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Velocity v1"
                                  {...field}
                                  className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-xl rounded-lg transition-all"
                                />
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="appUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Project URL
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://..."
                                  {...field}
                                  className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-xl rounded-lg transition-all"
                                />
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="videoUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Founder Video URL
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://youtube.com/watch?v=..."
                                  {...field}
                                  className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-base rounded-lg transition-all"
                                />
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="appLogo"
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                App Logo
                              </FormLabel>
                              <FormControl>
                                <Dialog
                                  open={isLogoDialogOpen}
                                  onOpenChange={setIsLogoDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <button
                                      type="button"
                                      className="w-full flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10 transition-all"
                                    >
                                      <div className="h-16 w-16 rounded-lg bg-[#111] border border-white/10 overflow-hidden flex items-center justify-center">
                                        {logoPreviewUrl ? (
                                          <div
                                            className="h-full w-full bg-cover bg-center"
                                            style={{
                                              backgroundImage: `url(${logoPreviewUrl})`,
                                            }}
                                          />
                                        ) : (
                                          <Upload className="h-6 w-6 text-white/40" />
                                        )}
                                      </div>
                                      <div className="flex flex-col items-start text-left">
                                        <span className="text-white/90 font-semibold">
                                          {value instanceof File
                                            ? value.name
                                            : "Upload your logo"}
                                        </span>
                                        <span className="text-white/40 text-sm">
                                          Click to add an image
                                          (JPG/PNG/WEBP/SVG, max 2MB)
                                        </span>
                                      </div>
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-[#0B0B0B] border-white/10 text-white">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Upload your app logo
                                      </DialogTitle>
                                      <DialogDescription className="text-white/50">
                                        Choose a clean square image for the best
                                        look across listings.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                      <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-6 hover:bg-white/10 cursor-pointer transition-all">
                                        <Upload className="h-4 w-4 text-white/70" />
                                        <span className="text-white/80 font-medium">
                                          Select image
                                        </span>
                                        <input
                                          {...field}
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              try {
                                                const compressed =
                                                  await compressImage(file);
                                                onChange(compressed);
                                              } catch {
                                                onChange(file);
                                              }
                                              setIsLogoDialogOpen(false);
                                            }
                                          }}
                                        />
                                      </label>
                                      <div className="text-xs text-white/40">
                                        JPG/PNG/WEBP/SVG up to 2MB (images will
                                        be compressed automatically).
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Description
                              </FormLabel>
                              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-[#EC4E02] transition-colors h-[400px]">
                                <RichTextEditor
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="Write a clear, friendly description of your app..."
                                  minHeight="h-full"
                                />
                              </div>
                              <div className="flex flex-wrap items-center gap-2 pt-3">
                                <span className="text-xs text-white/40 uppercase tracking-widest">
                                  Quick draft
                                </span>
                                {descriptionPresets.map((preset) => (
                                  <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() =>
                                      form.setValue(
                                        "description",
                                        preset.value,
                                        {
                                          shouldDirty: true,
                                          shouldTouch: true,
                                        },
                                      )
                                    }
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all"
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-10">
                      <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                          Token Setup
                        </h1>
                        <p className="text-white/50 text-lg">
                          Add your social handle and token economics.
                        </p>
                      </div>

                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="xHandle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                X Connection{" "}
                                <span className="text-white/40 normal-case font-normal">
                                  (optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-white/60">
                                      {field.value
                                        ? `Connected as ${field.value}`
                                        : "Not connected yet"}
                                    </span>
                                    <span className="text-xs text-white/40">
                                      {field.value
                                        ? "Your X account is verified."
                                        : "Connect your X account to verify ownership."}
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsTwitterModalOpen(true)}
                                    className="border-white/20 text-white hover:bg-white/10"
                                  >
                                    {field.value ? "Reconnect" : "Connect X"}
                                  </Button>
                                  <input type="hidden" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tokenName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Token Ticker
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="VIBE"
                                  {...field}
                                  className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-xl rounded-lg transition-all"
                                />
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-10">
                      <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                          Launch
                        </h1>
                        <p className="text-white/50 text-lg">
                          Schedule your launch, review details, and publish.
                        </p>
                      </div>

                      <div className="space-y-8">
                      {/* Start Time Mode Toggle */}
                      <FormField
                        control={form.control}
                        name="useImmediateStart"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                  Start Time Mode
                                </FormLabel>
                                <p className="text-xs text-white/50 mt-1">
                                  Choose how to set the presale start time
                                </p>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-[#EC4E02]"
                                />
                              </FormControl>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className={`font-medium ${field.value ? "text-white" : "text-white/40"}`}>
                                Start Immediately
                              </span>
                              <span className="text-white/20">/</span>
                              <span className={`font-medium ${!field.value ? "text-white" : "text-white/40"}`}>
                                Schedule Launch
                              </span>
                            </div>
                            {field.value && (
                              <p className="text-xs text-[#EC4E02] font-medium mt-1">
                                ⚠️ The presale will start immediately after creation
                              </p>
                            )}
                            <FormMessage className="text-[#EC4E02]" />
                          </FormItem>
                        )}
                      />

                      {!form.watch("useImmediateStart") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="launchDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Launch Date (UTC)
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className={cn(
                                        "h-14 justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 text-white",
                                        !field.value && "text-white/40",
                                      )}
                                    >
                                      {field.value ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Select date (UTC)</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value + "T00:00:00Z")
                                        : undefined
                                    }
                                    onSelect={(d) => {
                                      if (d) {
                                        const utcDate = formatInTimeZone(
                                          d,
                                          "UTC",
                                          "yyyy-MM-dd",
                                        );
                                        field.onChange(utcDate);
                                      } else {
                                        field.onChange("");
                                      }
                                    }}
                                    disabled={(date) => {
                                      const nowUTC = new Date();
                                      const todayUTC = new Date(
                                        formatInTimeZone(
                                          nowUTC,
                                          "UTC",
                                          "yyyy-MM-dd",
                                        ) + "T00:00:00Z",
                                      );
                                      return date < todayUTC;
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage className="text-[#EC4E02]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="launchTime"
                          render={({ field }) => {
                            const [isTimeOpen, setIsTimeOpen] = useState(false);
                            const timeDropdownRef =
                              useRef<HTMLDivElement>(null);

                            useEffect(() => {
                              const handleClickOutside = (
                                event: MouseEvent,
                              ) => {
                                if (
                                  timeDropdownRef.current &&
                                  !timeDropdownRef.current.contains(
                                    event.target as Node,
                                  )
                                ) {
                                  setIsTimeOpen(false);
                                }
                              };
                              document.addEventListener(
                                "mousedown",
                                handleClickOutside,
                              );
                              return () =>
                                document.removeEventListener(
                                  "mousedown",
                                  handleClickOutside,
                                );
                            }, []);

                            const nowUTC = new Date();
                            const currentUTCHour = nowUTC.getUTCHours();
                            const currentUTCMinute = nowUTC.getUTCMinutes();
                            const currentTimeInMinutes =
                              currentUTCHour * 60 + currentUTCMinute;

                            const selectedDate = form.watch("launchDate");
                            const todayUTC = formatInTimeZone(
                              nowUTC,
                              "UTC",
                              "yyyy-MM-dd",
                            );
                            const isToday = selectedDate === todayUTC;

                            return (
                              <FormItem>
                                <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                  Launch Time (UTC)
                                </FormLabel>
                                <FormControl>
                                  <div
                                    ref={timeDropdownRef}
                                    className="relative"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => setIsTimeOpen(!isTimeOpen)}
                                      className={cn(
                                        "h-14 w-full flex items-center justify-between px-4 bg-white/5 border border-white/10 rounded-lg transition-all hover:bg-white/10",
                                        isTimeOpen && "border-[#EC4E02]",
                                        field.value
                                          ? "text-white"
                                          : "text-white/40",
                                      )}
                                    >
                                      <span>
                                        {field.value
                                          ? `${field.value} UTC`
                                          : "Select time (UTC)"}
                                      </span>
                                      <svg
                                        className={cn(
                                          "w-4 h-4 text-white/50 transition-transform duration-200",
                                          isTimeOpen && "rotate-180",
                                        )}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </button>
                                    <div
                                      className={cn(
                                        "absolute z-50 top-full left-0 right-0 mt-2 bg-[#0B0B0B] border border-white/10 rounded-lg overflow-hidden transition-all duration-200 origin-top",
                                        isTimeOpen
                                          ? "opacity-100 scale-y-100 pointer-events-auto"
                                          : "opacity-0 scale-y-95 pointer-events-none",
                                      )}
                                    >
                                      <div className="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {TIME_OPTIONS.map((t) => {
                                          const [hours, minutes] = t
                                            .split(":")
                                            .map(Number);
                                          const timeInMinutes =
                                            hours * 60 + minutes;

                                          const isPastTime =
                                            isToday &&
                                            timeInMinutes <=
                                              currentTimeInMinutes;

                                          return (
                                            <button
                                              key={t}
                                              type="button"
                                              onClick={() => {
                                                if (!isPastTime) {
                                                  field.onChange(t);
                                                  setIsTimeOpen(false);
                                                }
                                              }}
                                              disabled={isPastTime}
                                              className={cn(
                                                "w-full px-4 py-3 text-left text-sm transition-colors",
                                                isPastTime
                                                  ? "text-white/20 cursor-not-allowed"
                                                  : "hover:bg-white/10",
                                                field.value === t
                                                  ? "bg-[#EC4E02]/20 text-[#EC4E02]"
                                                  : isPastTime
                                                    ? "text-white/20"
                                                    : "text-white/80",
                                              )}
                                            >
                                              {t}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[#EC4E02]" />
                              </FormItem>
                            );
                          }}
                        />
                        </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="erc20Name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                  ERC20 Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="My Awesome Token"
                                    {...field}
                                    className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-xl rounded-lg transition-all"
                                  />
                                </FormControl>
                                <FormMessage className="text-[#EC4E02]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="erc20Symbol"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                  ERC20 Symbol
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MAT"
                                    {...field}
                                    className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-xl rounded-lg transition-all uppercase"
                                    onChange={(e) => {
                                      field.onChange(e.target.value.toUpperCase());
                                    }}
                                    value={field.value}
                                  />
                                </FormControl>
                                <FormMessage className="text-[#EC4E02]" />
                                <p className="text-xs text-white/40 mt-1 ml-1">
                                  Short ticker symbol (2-10 characters)
                                </p>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="communityWallet"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 uppercase text-xs tracking-widest font-bold ml-1">
                                Community Wallet Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="0x..."
                                  {...field}
                                  className="h-14 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-base rounded-lg transition-all font-mono"
                                />
                              </FormControl>
                              <FormMessage className="text-[#EC4E02]" />
                              <p className="text-xs text-white/40 mt-1 ml-1">
                                Enter the wallet address for community funds
                              </p>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              Name
                            </p>
                            <p className="text-xl font-medium text-white">
                              {form.getValues("appName")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              ERC20 Name
                            </p>
                            <p className="text-xl font-medium text-white">
                              {form.getValues("erc20Name") || "Not set"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              ERC20 Symbol
                            </p>
                            <p className="text-xl font-medium text-white">
                              {form.getValues("erc20Symbol") || "Not set"}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              URL
                            </p>
                            <p className="text-lg text-white font-mono break-all">
                              {form.getValues("appUrl")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              X Username
                            </p>
                            <p className="text-lg text-white font-mono break-all">
                              {form.getValues("xHandle")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                              Launch
                            </p>
                            <p className="text-lg text-white font-mono break-all">
                              {form.getValues("launchDate")}{" "}
                              {form.getValues("launchTime")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#EC4E02]/10 border border-[#EC4E02]/20">
                          <div className="w-5 h-5 rounded-full bg-[#EC4E02] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                          <p className="text-sm text-white/80">
                            By proceeding, you agree that you are the owner of
                            this project and have the rights to tokenize it.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#EC4E02]/10 border border-[#EC4E02]/30 flex items-center justify-center">
                            <Rocket className="h-5 w-5 text-[#EC4E02]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              Verify ownership
                            </h3>
                            <p className="text-sm text-white/50">
                              Add this tag to your site before launching.
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-[#111] border border-white/10 rounded-lg p-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                          <code className="text-[#EC4E02] font-mono text-sm flex-1 truncate">
                            &lt;meta name="vibefund-verification" /&gt;
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-[#EC4E02] hover:text-white"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                '<meta name="vibefund-verification" />',
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="text-white/40 hover:text-white hover:bg-white/5"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>

                  {currentStep === 3 ? (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="bg-[#EC4E02] hover:bg-[#D94500] text-white px-8 h-12 rounded-lg font-bold shadow-lg shadow-[#EC4E02]/20"
                    >
                      {isSubmitting ? "Launching..." : "Launch Token"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-white text-black hover:bg-gray-200 px-8 h-12 rounded-lg font-bold"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Dialog open={isTwitterModalOpen} onOpenChange={setIsTwitterModalOpen}>
        <DialogContent className="bg-[#0B0B0B] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Connect X (Twitter)</DialogTitle>
            <DialogDescription className="text-white/50">
              We will open Twitter in a popup so you can authorize access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-white/70">
            <p>Complete the authorization and come back here.</p>
            {twitterError && (
              <p className="text-[#EC4E02] text-sm">{twitterError}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsTwitterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={startTwitterConnect}
              disabled={isTwitterConnecting}
              className="bg-[#EC4E02] hover:bg-[#D94500]"
            >
              {isTwitterConnecting ? "Waiting..." : "Connect X"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
