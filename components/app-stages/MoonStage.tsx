"use client";

import { Moon, CheckCircle2, Coins, Rocket, XCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  fundingGoalFormatted?: string | null;
  receivedFundingFormatted?: string | null;
  fundedUsersCount?: number | null;
  fundingStatus?: string | null;
  presaleStatus?: string | null;
  crowdfundAddress?: string | null;
  softCapReached?: boolean | null;
  presaleId?: string | null; // MongoDB presale ID for API calls
  creator?: string | null; // Presale creator wallet address
}

export function MoonStage({
  fundingGoalFormatted,
  receivedFundingFormatted,
  fundedUsersCount,
  fundingStatus,
  presaleStatus,
  crowdfundAddress,
  softCapReached,
  presaleId,
  creator,
}: Props) {
  const isFailed = presaleStatus === "Failed";
  const isNotReached = presaleStatus === "Not Reached";
  const { wallets } = useWallets();
  const walletAddress = wallets[0]?.address || null;
  const isCreator = walletAddress && creator && walletAddress.toLowerCase() === creator.toLowerCase();
  const [myContribution, setMyContribution] = useState<string | null>(null);
  const [isLoadingContribution, setIsLoadingContribution] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [isClaimingRefund, setIsClaimingRefund] = useState(false);
  const [hasRecoveredFunds, setHasRecoveredFunds] = useState<boolean>(false);
  const [isLoadingRecoveryStatus, setIsLoadingRecoveryStatus] = useState(false);

  const PRESALE_CONTRACT_ABI = [
    "function contributions(address) view returns (uint256)",
    "function recoverFunds() external",
    "function claimRefund() external",
  ];

  useEffect(() => {
    const fetchContribution = async () => {
      if ((!isFailed && !(isNotReached && isCreator)) || !walletAddress || !crowdfundAddress) {
        setMyContribution(null);
        return;
      }

      setIsLoadingContribution(true);
      try {
        const wallet = wallets[0];
        if (!wallet) {
          setMyContribution(null);
          return;
        }

        const provider = await wallet.getEthereumProvider();
        const ethersProvider = new ethers.BrowserProvider(provider);
        
        const contract = new ethers.Contract(
          crowdfundAddress,
          PRESALE_CONTRACT_ABI,
          ethersProvider
        );

        const contributionWei = await contract.contributions(walletAddress);
        
        const contributionUSDC = Number(contributionWei) / 1e6;
        setMyContribution(contributionUSDC.toFixed(2));
      } catch (error) {
        console.error("Error fetching contribution:", error);
        setMyContribution(null);
      } finally {
        setIsLoadingContribution(false);
      }
    };

    fetchContribution();
  }, [isFailed, isNotReached, isCreator, walletAddress, crowdfundAddress, wallets]);

  useEffect(() => {
    const fetchRecoveryStatus = async () => {
      if (!isFailed || !walletAddress || !presaleId) {
        setHasRecoveredFunds(false);
        return;
      }

      setIsLoadingRecoveryStatus(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(
          `${backendUrl}/api/presales/id/${presaleId}/recovery-status/${walletAddress}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHasRecoveredFunds(data.hasRecovered || false);
        } else {
          console.error("Failed to fetch recovery status");
          setHasRecoveredFunds(false);
        }
      } catch (error) {
        console.error("Error fetching recovery status:", error);
        setHasRecoveredFunds(false);
      } finally {
        setIsLoadingRecoveryStatus(false);
      }
    };

    fetchRecoveryStatus();
  }, [isFailed, walletAddress, presaleId]);

  const handleRecoverFunds = async () => {
    if (!walletAddress || !crowdfundAddress) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!myContribution || myContribution === "0" || parseFloat(myContribution) === 0) {
      toast.error("No funds to recover");
      return;
    }

    setIsRecovering(true);
    try {
      const wallet = wallets[0];
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(
        crowdfundAddress,
        PRESALE_CONTRACT_ABI,
        signer
      );

      toast.info("Confirm recover funds transaction in your wallet...");

      const tx = await contract.recoverFunds();
      
      toast.info("Transaction submitted, waiting for confirmation...");
      
      const receipt = await tx.wait();
      
      toast.success(`Successfully recovered $${myContribution} USDC!`);

      if (presaleId) {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
          await fetch(`${backendUrl}/api/presales/id/${presaleId}/recover-funds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: walletAddress,
              amount: myContribution,
            }),
          });
          setHasRecoveredFunds(true);
        } catch (error) {
          console.error("Error recording recovery in backend:", error);
          setHasRecoveredFunds(true);
        }
      } else {
        setHasRecoveredFunds(true);
      }

      setTimeout(async () => {
        try {
          const readContract = new ethers.Contract(
            crowdfundAddress,
            PRESALE_CONTRACT_ABI,
            ethersProvider
          );
          const contributionWei = await readContract.contributions(walletAddress);
          const contributionUSDC = Number(contributionWei) / 1e6;
          setMyContribution(contributionUSDC.toFixed(2));
        } catch (error) {
          console.error("Error refreshing contribution:", error);
          setMyContribution("0");
        }
      }, 2000);
    } catch (error: any) {
      console.error("Recover funds error:", error);
      if (error.code === 4001) {
        toast.error("Transaction rejected by user");
      } else if (error.code === "CALL_EXCEPTION" || error.message?.includes("missing revert data")) {
        toast.error("Transaction failed. Please check: 1) Presale has failed, 2) You have contributed funds, 3) Funds haven't been recovered yet");
      } else if (error.message?.includes("revert")) {
        toast.error("Transaction failed: " + (error.reason || error.message));
      } else {
        toast.error("Recover funds failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsRecovering(false);
    }
  };

  const handleClaimRefund = async () => {
    if (!walletAddress || !crowdfundAddress) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!myContribution || myContribution === "0" || parseFloat(myContribution) === 0) {
      toast.error("No funds to claim refund");
      return;
    }

    setIsClaimingRefund(true);
    try {
      const wallet = wallets[0];
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(
        crowdfundAddress,
        PRESALE_CONTRACT_ABI,
        signer
      );

      toast.info("Confirm claim refund transaction in your wallet...");

      const tx = await contract.claimRefund();
      
      toast.info("Transaction submitted, waiting for confirmation...");
      
      const receipt = await tx.wait();
      
      toast.success(`Successfully claimed refund of $${myContribution} USDC!`);
      
      setTimeout(async () => {
        try {
          const readContract = new ethers.Contract(
            crowdfundAddress,
            PRESALE_CONTRACT_ABI,
            ethersProvider
          );
          const contributionWei = await readContract.contributions(walletAddress);
          const contributionUSDC = Number(contributionWei) / 1e6;
          setMyContribution(contributionUSDC.toFixed(2));
        } catch (error) {
          console.error("Error refreshing contribution:", error);
          setMyContribution("0");
        }
      }, 2000);
    } catch (error: any) {
      console.error("Claim refund error:", error);
      if (error.code === 4001) {
        toast.error("Transaction rejected by user");
      } else if (error.code === "CALL_EXCEPTION" || error.message?.includes("missing revert data")) {
        toast.error("Transaction failed. Please check: 1) Presale has failed, 2) You have contributed funds, 3) Refund hasn't been claimed yet");
      } else if (error.message?.includes("revert")) {
        toast.error("Transaction failed: " + (error.reason || error.message));
      } else {
        toast.error("Claim refund failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsClaimingRefund(false);
    }
  };

  const hasNoContribution = 
    !myContribution || 
    myContribution === "0" || 
    parseFloat(myContribution) === 0;
  
  const isRecoverDisabled = 
    !walletAddress || 
    hasNoContribution || 
    isRecovering ||
    isLoadingContribution;

  const isClaimRefundDisabled = 
    !walletAddress || 
    isClaimingRefund ||
    isLoadingContribution ||
    (isFailed && hasNoContribution);
  
  const shouldShowClaimRefundButton = 
    walletAddress && 
    !isLoadingContribution &&
    (
      (isFailed && softCapReached === false && !hasNoContribution) ||
      (isNotReached && isCreator)
    );

  const shouldShowRecoverButton = 
    isFailed && 
    softCapReached !== false && 
    walletAddress && 
    !hasNoContribution && 
    !isLoadingContribution;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
          {isFailed ? "Presale Failed" : "Funding Complete"}
        </h3>
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-[#FBBF24]/10 border border-[#FBBF24]/20">
          <Moon className="h-5 w-5 text-[#FBBF24]" />
        </div>
      </div>

      {/* Success Banner */}
      <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl mb-6 ${isFailed ? "bg-red-500/10 border border-red-500/20" : "bg-[#FBBF24]/10 border border-[#FBBF24]/20"}`}>
        {isFailed ? (
          <XCircle className="h-6 w-6 text-red-500" />
        ) : (
          <CheckCircle2 className="h-6 w-6 text-[#FBBF24]" />
        )}
        <span className={`text-sm font-black uppercase tracking-wider ${isFailed ? "text-red-500" : "text-[#FBBF24]"}`}>
          {isFailed ? "Presale finalized but failed!" : "Successfully Funded!"}
        </span>
      </div>

      {/* Final Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
            Total Raised
          </span>
          <span className="text-xl font-black text-[#FBBF24]">
            ${receivedFundingFormatted ?? "0"}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
            Funding Goal
          </span>
          <span className="text-lg font-bold text-white">
            ${fundingGoalFormatted ?? "0"}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
            Total Backers
          </span>
          <span className="text-lg font-bold text-white">
            {fundedUsersCount ?? 0}
          </span>
        </div>

        {/* My Contribution - Show when presale status is Failed, or when Not Reached and user is creator */}
        {((isFailed || (isNotReached && isCreator)) && walletAddress) && (
          <>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                My Contribution
              </span>
              <span className="text-lg font-bold text-white">
                {isLoadingContribution ? (
                  <span className="text-white/40">Loading...</span>
                ) : myContribution !== null ? (
                  `$${myContribution} USDC`
                ) : (
                  "$0.00 USDC"
                )}
              </span>
            </div>

            {/* Claim Refund Button - Only show when presale status is Failed, softCapReached is false, and user has contribution */}
            {shouldShowClaimRefundButton && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isClaimRefundDisabled}
                    className="w-full h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 hover:border-orange-500/30 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isClaimingRefund ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      "Claim Refund"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Claim Refund</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to claim your refund? This will refund ${myContribution || "0"} USDC to your wallet.
                      <br />
                      <br />
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClaimRefund}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Claim Refund
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {/* Recover Funds Button - Only show when presale status is Failed, softCapReached is not false, and user has contribution */}
            {shouldShowRecoverButton && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isRecoverDisabled}
                    className="w-full h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 hover:border-orange-500/30 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isRecovering ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Recovering...
                      </>
                    ) : hasRecoveredFunds ? (
                      "Already Recovered"
                    ) : (
                      "Recover Funds"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Recover Funds</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to recover your contributed funds? This will refund ${myContribution || "0"} USDC to your wallet.
                      <br />
                      <br />
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRecoverFunds}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Recover Funds
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}

        {/* Wallet Connection Message - Show when presale status is Failed or Not Reached (when creator) and no wallet */}
        {((isFailed || (isNotReached && isCreator)) && !walletAddress) && (
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-xs font-bold text-white/50 uppercase tracking-wider text-center">
              Connect your wallet to recover funds
            </span>
          </div>
        )}

        {fundingStatus && (
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20">
            <Coins className="h-4 w-4 text-[#FBBF24]" />
            <span className="text-[10px] font-black text-[#FBBF24] uppercase tracking-wider">
              {fundingStatus}
            </span>
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FBBF24]/5 border border-[#FBBF24]/10">
          <Rocket className="h-5 w-5 text-[#FBBF24]" />
          <div>
            <p className="text-xs font-bold text-white uppercase">Token Launching Soon</p>
            <p className="text-[10px] text-white/40 mt-0.5">Stay tuned for updates</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
