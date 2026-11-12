"use client";

import { useEffect, useState } from "react";
import { Sparkles, Clock, Flame, Wallet, Users, TrendingUp, Minus, Plus, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useWallets } from "@privy-io/react-auth";

interface Props {
  fundingGoal?: string | null;
  fundingGoalFormatted?: string | null;
  receivedFunding?: string | null;
  receivedFundingFormatted?: string | null;
  fundingEndDateIso?: string | null;
  fundedUsersCount?: number | null;
  fundingStatus?: string | null;
  walletAddress?: string | null;
  authenticated?: boolean;
  crowdfundAddress?: string | null;
}

export function PumpingStage({
  fundingGoal,
  fundingGoalFormatted,
  receivedFunding,
  receivedFundingFormatted,
  fundingEndDateIso,
  fundedUsersCount,
  fundingStatus,
  walletAddress,
  authenticated,
  crowdfundAddress,
}: Props) {
  const [fundAmount, setFundAmount] = useState("");
  const [isFunding, setIsFunding] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const { wallets } = useWallets();

  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  const USDC_DECIMALS = 6;

  const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
  ];

  const PRESALE_CONTRACT_ABI = [
    "function contribute(uint256 amount) external",
    "function isActive() external view returns (bool)",
    "function hasEnded() external view returns (bool)",
    "function startTime() external view returns (uint256)",
    "function getEndTime() external view returns (uint256)",
  ];

  const progress = (() => {
    if (!fundingGoal || !receivedFunding) return 0;
    const goal = parseFloat(fundingGoal);
    const received = parseFloat(receivedFunding);
    if (goal <= 0) return 0;
    return Math.min((received / goal) * 100, 100);
  })();

  useEffect(() => {
    if (!fundingEndDateIso) return;

    const calculateTime = () => {
      const target = new Date(fundingEndDateIso).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft("Ended");
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [fundingEndDateIso]);

  const handleFund = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) return;
    if (!authenticated || !walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!crowdfundAddress) {
      toast.error("Presale contract address not available");
      return;
    }

    setIsFunding(true);
    try {
      const wallet = wallets[0];
      if (!wallet) {
        throw new Error("No wallet connected");
      }

      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const userAddress = await signer.getAddress();

      const usdcAmount = parseFloat(fundAmount);
      const amountWei = ethers.parseUnits(usdcAmount.toFixed(6), USDC_DECIMALS);

      const usdcContract = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        signer
      );

      toast.info("Checking USDC allowance...");
      const currentAllowance = await usdcContract.allowance(userAddress, crowdfundAddress);

      if (currentAllowance < amountWei) {
        toast.info("Approval needed. Please confirm the approval transaction in your wallet...");
        
        const maxApproval = ethers.MaxUint256;
        const approveTx = await usdcContract.approve(crowdfundAddress, maxApproval);
        
        toast.info("Waiting for approval confirmation...");
        await approveTx.wait();
        
        toast.success("USDC approved successfully!");
      }

      const presaleContractRead = new ethers.Contract(
        crowdfundAddress,
        PRESALE_CONTRACT_ABI,
        ethersProvider
      );

      const balance = await usdcContract.balanceOf(userAddress);
      if (balance < amountWei) {
        throw new Error("Insufficient USDC balance");
      }

      try {
        const startTime = await presaleContractRead.startTime();
        const endTime = await presaleContractRead.getEndTime();
        const now = Math.floor(Date.now() / 1000);

        if (startTime > now) {
          throw new Error("Presale has not started yet");
        }
        if (endTime <= now) {
          throw new Error("Presale has ended");
        }
      } catch (error: any) {
        if (error.message && !error.message.includes("CALL_EXCEPTION")) {
          throw error;
        }
      }

      const presaleContract = new ethers.Contract(
        crowdfundAddress,
        PRESALE_CONTRACT_ABI,
        signer
      );

      toast.info("Confirm contribution transaction in your wallet...");

      const tx = await presaleContract.contribute(amountWei);
      
      toast.info("Transaction submitted, waiting for confirmation...");
      
      const receipt = await tx.wait();
      
      toast.success(`Successfully contributed $${fundAmount} USDC!`);
      setFundAmount("");
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Contribute error:", error);
      if (error.code === 4001) {
        toast.error("Transaction rejected by user");
      } else if (error.code === "CALL_EXCEPTION" || error.message?.includes("missing revert data")) {
        if (error.message?.includes("Insufficient")) {
          toast.error("Insufficient USDC balance");
        } else if (error.message?.includes("Presale has not started") || error.message?.includes("Presale has ended")) {
          toast.error(error.message);
        } else {
          toast.error("Transaction failed. Please check: 1) Presale is active, 2) You have enough USDC, 3) Amount is valid");
        }
      } else if (error.message?.includes("revert")) {
        toast.error("Transaction failed: " + (error.reason || error.message));
      } else {
        toast.error("Contribution failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsFunding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
          Fund Protocol
        </h3>
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-[#EC4E02]/10 border border-[#EC4E02]/20">
          <Sparkles className="h-5 w-5 text-[#EC4E02]" />
        </div>
      </div>

      {/* Funding Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
            Total Raised
          </span>
          <span className="text-xl font-black text-[#EC4E02]">
            ${receivedFundingFormatted ?? "0"}
          </span>
        </div>
        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#EC4E02] to-[#FF5A0A]"
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 font-bold">
          <span>{progress.toFixed(0)}% Funded</span>
          <span>Goal: ${fundingGoalFormatted ?? "0"}</span>
        </div>
      </div>

      {/* End Time */}
      <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5">
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-white/40" />
          <span className="text-[10px] font-bold text-white/40 uppercase">Ends in</span>
        </div>
        <span className="text-sm font-black text-[#EC4E02] tabular-nums">{timeLeft}</span>
      </div>

      {/* Funding Status */}
      {fundingStatus && (
        <div className="mt-2 flex items-center justify-center gap-2 p-2 rounded-xl bg-[#EC4E02]/10 border border-[#EC4E02]/20">
          <Flame className="h-3 w-3 text-[#EC4E02]" />
          <span className="text-[10px] font-black text-[#EC4E02] uppercase tracking-wider">
            {fundingStatus}
          </span>
        </div>
      )}

      {/* Real-world Trading UI */}
      <div className="mt-6 space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between px-1">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
            Amount to Fund
          </label>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-[#EC4E02]" />
            <span className="text-[10px] font-bold text-[#EC4E02] uppercase tracking-wider">Instant Fund</span>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EC4E02]/20 to-transparent rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-all duration-500" />
          <div className="relative flex items-center h-16 rounded-2xl bg-black/40 border border-white/10 group-focus-within:border-[#EC4E02]/50 transition-all overflow-hidden p-1">
            <button
              onClick={() => {
                const val = parseFloat(fundAmount || "0");
                if (val > 0) {
                  const newVal = Math.max(0, val - 10);
                  setFundAmount(newVal === 0 ? "" : newVal.toString());
                }
              }}
              className="h-full px-4 text-white/30 hover:text-[#EC4E02] hover:bg-[#EC4E02]/5 transition-all outline-none"
            >
              <Minus className="h-5 w-5" />
            </button>

            <div className="flex-1 relative flex items-center h-full px-2">
              <span className="text-[#EC4E02] font-black text-xl mr-2">$</span>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || parseFloat(val) >= 0) {
                    setFundAmount(val);
                  }
                }}
                placeholder="0.00"
                className="w-full bg-transparent text-white text-2xl font-black placeholder:text-white/10 outline-none tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <button
              onClick={() => {
                const val = parseFloat(fundAmount || "0");
                setFundAmount((val + 10).toString());
              }}
              className="h-full px-4 text-white/30 hover:text-[#EC4E02] hover:bg-[#EC4E02]/5 transition-all outline-none"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Improved Fixed Amounts */}
        <div className="grid grid-cols-4 gap-2">
          {["10", "100", "500", "1000"].map((amount) => (
            <button
              key={amount}
              onClick={() => setFundAmount(amount)}
              className={`py-2.5 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest
                ${fundAmount === amount
                  ? "bg-[#EC4E02]/20 border-[#EC4E02]/40 text-[#EC4E02]"
                  : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <Button
          onClick={handleFund}
          disabled={isFunding || !fundAmount || parseFloat(fundAmount) <= 0}
          className="w-full h-16 rounded-2xl bg-[#EC4E02] hover:bg-[#FF5A0A] text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(236,78,2,0.4)] disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-3 border-none group"
        >
          <AnimatePresence mode="wait">
            {isFunding ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Synchronizing...
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <Wallet className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Commit Funding
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Backers */}
      <div className="mt-4 flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-[#EC4E02]" />
          <div>
            <p className="text-sm font-bold text-white">{fundedUsersCount ?? 0} Backers</p>
            <p className="text-[10px] text-white/40">Already funded</p>
          </div>
        </div>
        <TrendingUp className="h-5 w-5 text-[#EC4E02]" />
      </div>

    </motion.div>
  );
}
