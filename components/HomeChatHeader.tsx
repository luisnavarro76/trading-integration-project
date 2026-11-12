"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  User,
  Copy,
  LogOut,
  HelpCircle,
  Plus,
  Rocket,
  Landmark,
  RefreshCw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePrivy, useWallets, useConnectWallet } from "@privy-io/react-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
  {
    ssr: false,
  },
);

// USDC contract address on Base
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;

export function HomeChatHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Privy hooks
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { connectWallet } = useConnectWallet();

  // Get the first wallet
  const wallet = wallets[0];
  const walletAddress = wallet?.address || null;
  const lastSignedInWalletRef = useRef<string | null>(null);

  // Balance state
  const [balance, setBalance] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  // Home check
  const isHomeActive = pathname === "/" || pathname === "/#";

  // Fetch wallet balance (ETH and USDC)
  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet || !walletAddress) {
        setBalance(null);
        setUsdcBalance(null);
        return;
      }

      // Helper function to fetch ERC-20 token balance
      const fetchTokenBalance = async (
        provider: any,
        tokenAddress: string,
        walletAddr: string,
        decimals: number
      ): Promise<string | null> => {
        try {
          // ERC-20 balanceOf(address) function selector: 0x70a08231
          // Pad address to 32 bytes (64 hex chars) after removing '0x'
          const addressParam = walletAddr.slice(2).toLowerCase().padStart(64, "0");
          const data = `0x70a08231${addressParam}`;

          const result = await provider.request({
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: data,
              },
              "latest",
            ],
          });

          // Convert hex result to BigInt, then to human-readable format
          const balanceRaw = BigInt(result as string);
          const balance = Number(balanceRaw) / Math.pow(10, decimals);
          return balance.toFixed(2);
        } catch (err) {
          console.error("Failed to fetch token balance:", err);
          return null;
        }
      };

      try {
        const provider = await wallet.getEthereumProvider();

        // Fetch ETH balance
        try {
          const balanceHex = await provider.request({
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
          });
          // Convert from wei to ETH
          const balanceWei = BigInt(balanceHex as string);
          const balanceEth = Number(balanceWei) / 1e18;
          setBalance(balanceEth.toFixed(4));
        } catch (err) {
          console.error("Failed to fetch ETH balance:", err);
          setBalance(null);
        }

        // Fetch USDC balance
        const usdcBal = await fetchTokenBalance(
          provider,
          USDC_ADDRESS,
          walletAddress,
          USDC_DECIMALS
        );
        setUsdcBalance(usdcBal);
      } catch (err) {
        console.error("Failed to fetch balances:", err);
      }
    };

    fetchBalances();
  }, [wallet, walletAddress]);

  // Backend session sign-in
  // useEffect(() => {
  //   if (!ready) return;
  //   if (!authenticated || !walletAddress) {
  //     lastSignedInWalletRef.current = null;
  //     return;
  //   }
  //   if (lastSignedInWalletRef.current === walletAddress) return;
  //   lastSignedInWalletRef.current = walletAddress;

  //   fetch("/api/sign_in", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ wallet_id: walletAddress }),
  //   }).then(async (res) => {
  //     if (res.ok) return;
  //     const details = await res.text().catch(() => "");
  //     console.error("Backend sign-in failed:", details);
  //     lastSignedInWalletRef.current = null;
  //     toast.error("Backend sign-in failed");
  //   });
  // }, [ready, authenticated, walletAddress]);

  // Handle Launch App button click - prompts wallet connection if not connected
  const handleLaunchAppClick = async () => {
    try {
      if (authenticated && walletAddress) {
        // Already connected, navigate to launch app
        router.push("/launch-app");
      } else {
        // Not connected, prompt wallet connection
        await login();
      }
    } catch (error: any) {
      console.error("Launch app error:", error);
    }
  };

  // Handle copy address
  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.success("Address copied!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  // Handle switch wallet - force complete disconnection and reload
  // This is the most reliable way to reset MetaMask's account selection
  const handleSwitchWallet = async () => {
    try {
      // Show a message to the user
      toast.info("Disconnecting wallet...", {
        description: "Please wait while we reset the connection",
      });
      
      // Disconnect/logout from Privy first
      await fetch("/api/sign_out", { method: "POST" }).catch(() => null);
      await logout();
      
      // Try to revoke MetaMask permissions if possible
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const ethereum = (window as any).ethereum;
          if (ethereum.request && typeof ethereum.request === "function") {
            // Try to revoke permissions (this may not work in all MetaMask versions)
            try {
              await ethereum.request({
                method: "wallet_revokePermissions",
                params: [{ eth_accounts: {} }],
              });
            } catch (e) {
              // wallet_revokePermissions might not be supported, that's okay
            }
          }
        } catch (e) {
          // Ignore MetaMask errors
        }
      }
      
      // Clear storage after a short delay
      setTimeout(() => {
        if (typeof window !== "undefined") {
          try {
            // Clear all Privy-related localStorage
            Object.keys(localStorage).forEach((key) => {
              if (key.toLowerCase().includes("privy") || key.toLowerCase().includes("wallet")) {
                localStorage.removeItem(key);
              }
            });
            // Clear sessionStorage
            Object.keys(sessionStorage).forEach((key) => {
              if (key.toLowerCase().includes("privy") || key.toLowerCase().includes("wallet")) {
                sessionStorage.removeItem(key);
              }
            });
          } catch (e) {
            // Ignore storage errors
          }
        }
        
        // Reload the page to force a complete reset
        // This ensures MetaMask shows account selection fresh
        window.location.reload();
      }, 300);
    } catch (err) {
      console.error("Failed to switch wallet:", err);
      toast.error("Failed to switch wallet. Please try disconnecting from MetaMask manually.");
      // Even on error, reload to reset state
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 1000);
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      await fetch("/api/sign_out", { method: "POST" }).catch(() => null);
      await logout();
      toast.success("Disconnected successfully");
    } catch (err) {
      toast.error("Failed to disconnect");
    }
  };

  return (
    <header className="sticky top-0 z-[60] w-full bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-12">
          <Link href="/" className="relative h-10 w-44 shrink-0 group">
            <Image
              src="/vibefund.png"
              alt="VibeFund"
              fill
              className="object-contain transition-all group-hover:brightness-110"
              priority
            />
          </Link>

          <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 group outline-none translate-y-[2px]">
                <HelpCircle className="h-4 w-4 text-white/40 group-hover:text-[#EC4E02] transition-colors" />
                <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                  How it works
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px] bg-[#0A0A0B] border-white/5 text-white/90 shadow-2xl backdrop-blur-3xl z-[100] p-0 overflow-hidden">
              <div className="relative w-full h-48 overflow-hidden bg-white/[0.02] border-b border-white/5">
                <Dithering
                  colorBack="#00000000"
                  colorFront="#EC4E02"
                  shape="warp"
                  type="4x4"
                  speed={isHowItWorksOpen ? 0.4 : 0}
                  className="size-full opacity-60"
                  minPixelRatio={1}
                />

                {/* Logo in Center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative h-20 w-20 p-4 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl">
                    <Image
                      src="/logo.png"
                      alt="VibeFund"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 pt-6">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-2xl font-black uppercase tracking-widest text-center">
                    How <span className="text-[#EC4E02]">VibeFund</span> Works
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center group/step">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#EC4E02]/10 border border-[#EC4E02]/20 flex items-center justify-center transition-all group-hover/step:scale-110 group-hover/step:bg-[#EC4E02]/20 mb-4">
                      <Plus className="h-6 w-6 text-[#EC4E02]" />
                    </div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-[#EC4E02] mb-1">
                      Step 01
                    </h4>
                    <h5 className="font-bold text-base text-white mb-2">
                      Code & Import
                    </h5>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      Build your agent in Lovable or Cursor. Import the URL to start.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center group/step">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#EC4E02]/10 border border-[#EC4E02]/20 flex items-center justify-center transition-all group-hover/step:scale-110 group-hover/step:bg-[#EC4E02]/20 mb-4">
                      <Landmark className="h-6 w-6 text-[#EC4E02]" />
                    </div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-[#EC4E02] mb-1">
                      Step 02
                    </h4>
                    <h5 className="font-bold text-base text-white mb-2">
                      Fundraising
                    </h5>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      Community funds your vision during the Pumping stage.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center group/step">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#EC4E02]/10 border border-[#EC4E02]/20 flex items-center justify-center transition-all group-hover/step:scale-110 group-hover/step:bg-[#EC4E02]/20 mb-4">
                      <Rocket className="h-6 w-6 text-[#EC4E02]" />
                    </div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-[#EC4E02] mb-1">
                      Step 03
                    </h4>
                    <h5 className="font-bold text-base text-white mb-2">
                      Launch App
                    </h5>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      Once funded, your token graduates to a full live launch.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pb-10">
                  <button
                    onClick={() => setIsHowItWorksOpen(false)}
                    className="flex items-center gap-2.5 h-12 px-8 bg-[#EC4E02] hover:bg-[#FF5A0A] text-white rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(236,78,2,0.4)] active:scale-95 group/btn"
                  >
                    <Rocket className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                    Got it 
                    </span>
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <nav className="hidden md:flex items-center gap-8" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLaunchAppClick}
            disabled={!ready}
            className="flex items-center gap-2.5 h-10 px-5 bg-[#EC4E02] hover:bg-[#FF5A0A] text-white rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Wallet className="h-3.5 w-3.5" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              {!ready ? "SYNCING" : "LAUNCH APP"}
            </span>
          </button>

          {ready && authenticated && walletAddress && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center h-10 w-10 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all active:scale-95 outline-none">
                  <User className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-48 bg-[#0F0F10] border border-white/10 rounded-lg p-1 z-[100]"
              >
                <DropdownMenuLabel className="px-2 py-1.5">
                  <span className="text-white/50 text-xs">Balance</span>
                  <div className="text-white text-sm font-semibold">
                    {balance !== null ? `${balance} ETH` : "0.00 ETH"}
                  </div>
                  <div className="text-white text-sm font-semibold mt-1">
                    {usdcBalance !== null ? `${usdcBalance} USDC` : "0.00 USDC"}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                  onClick={handleCopyAddress}
                  className="px-2 py-1.5 cursor-pointer hover:bg-white/5 rounded text-white text-sm"
                >
                  <Copy className="h-3.5 w-3.5 mr-2 text-white/50" />
                  Copy Address
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleSwitchWallet}
                  className="px-2 py-1.5 cursor-pointer hover:bg-white/5 rounded text-white text-sm"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-2 text-white/50" />
                  Switch Wallet
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDisconnect}
                  className="px-2 py-1.5 cursor-pointer hover:bg-red-500/10 rounded text-red-400 text-sm"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
