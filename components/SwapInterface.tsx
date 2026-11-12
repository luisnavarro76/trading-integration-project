"use client";

import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { useWallets } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowUpDown, Loader2, Wallet } from "lucide-react";

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;

const AERODROME_ROUTER = "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43";

interface SwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol?: string;
  authenticated: boolean;
  poolCreated?: boolean;
  poolAddress?: string | null;
  crowdfundAddress?: string | null;
}

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
];

const AERODROME_ROUTER_ABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
];

const CL_POOL_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function liquidity() view returns (uint256)",
];

export function SwapInterface({ 
  tokenAddress, 
  tokenSymbol = "TOKEN", 
  authenticated,
  poolCreated = false,
  poolAddress = null,
  crowdfundAddress = null,
}: SwapInterfaceProps) {
  const { wallets } = useWallets();
  const wallet = wallets[0];
  const walletAddress = wallet?.address;

  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number>(18);
  const [isReversed, setIsReversed] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [minOutputAmount, setMinOutputAmount] = useState<string>("");

  useEffect(() => {
    const fetchTokenDecimals = async () => {
      if (!tokenAddress || !wallet) return;
      try {
        const provider = await wallet.getEthereumProvider();
        const ethersProvider = new ethers.BrowserProvider(provider);
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, ethersProvider);
        
        try {
          const decimals = await tokenContract.decimals();
          setTokenDecimals(Number(decimals));
        } catch {
          setTokenDecimals(18);
        }
      } catch (error) {
        console.error("Error fetching token decimals:", error);
      }
    };
    fetchTokenDecimals();
  }, [tokenAddress, wallet]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletAddress || !wallet || !tokenAddress) {
        setTokenBalance(null);
        setUsdcBalance(null);
        return;
      }

      setIsLoadingBalance(true);
      try {
        const provider = await wallet.getEthereumProvider();
        const ethersProvider = new ethers.BrowserProvider(provider);

        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, ethersProvider);
        const tokenBalanceRaw = await tokenContract.balanceOf(walletAddress);
        const tokenBalanceFormatted = ethers.formatUnits(tokenBalanceRaw, tokenDecimals);
        setTokenBalance(Number(tokenBalanceFormatted).toFixed(4));

        const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, ethersProvider);
        const usdcBalanceRaw = await usdcContract.balanceOf(walletAddress);
        const usdcBalanceFormatted = ethers.formatUnits(usdcBalanceRaw, USDC_DECIMALS);
        setUsdcBalance(Number(usdcBalanceFormatted).toFixed(2));
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchBalances();
  }, [walletAddress, wallet, tokenAddress, tokenDecimals]);

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setInputAmount("");
    setOutputAmount("");
  };

  const checkPoolLiquidity = async (): Promise<boolean> => {
    if (!poolAddress || !wallet) return false;
    
    try {
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const poolContract = new ethers.Contract(poolAddress, CL_POOL_ABI, ethersProvider);
      
      const liquidity = await poolContract.liquidity().catch(() => null);
      return liquidity !== null && liquidity > 0n;
    } catch {
      return false;
    }
  };

  const getQuote = async (amountIn: string) => {
    if (!amountIn || parseFloat(amountIn) <= 0) {
      setOutputAmount("");
      setQuoteError(null);
      return;
    }

    if (!tokenAddress || !wallet) {
      setOutputAmount("");
      setQuoteError(null);
      return;
    }

    if (!poolCreated) {
      setOutputAmount("");
      setQuoteError("Liquidity pool not created yet");
      return;
    }

    if (poolAddress) {
      const hasLiquidity = await checkPoolLiquidity();
      if (!hasLiquidity) {
        setOutputAmount("");
        setQuoteError("Pool has no liquidity yet. You can still swap by entering minimum output amount manually.");
        return;
      }
    }

    try {
      setQuoteError(null);
      const inputDecimals = isReversed ? USDC_DECIMALS : tokenDecimals;
      const amountInWei = ethers.parseUnits(amountIn, inputDecimals);
      
      const path = isReversed 
        ? [USDC_ADDRESS, tokenAddress]
        : [tokenAddress, USDC_ADDRESS];
      const buyTokenDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;

      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      
      const routerContract = new ethers.Contract(AERODROME_ROUTER, AERODROME_ROUTER_ABI, ethersProvider);
      
      const amounts = await Promise.race([
        (async () => {
          try {
            return await routerContract.getAmountsOut(amountInWei, path);
          } catch (err: any) {
            throw new Error("CALL_EXCEPTION: No route or liquidity available");
          }
        })(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error("Quote request timeout")), 10000)
        )
      ]) as bigint[];
      
      const outputAmountWei = amounts[1];
      
      if (!outputAmountWei || outputAmountWei === 0n) {
        throw new Error("Invalid quote: output amount is zero");
      }
      
      const outputAmountFormatted = ethers.formatUnits(outputAmountWei, buyTokenDecimals);
      
      const decimals = buyTokenDecimals === 6 ? 2 : 4;
      const formattedAmount = Number(outputAmountFormatted).toFixed(decimals);
      
      setOutputAmount(formattedAmount);
      setQuoteError(null);
    } catch (error: any) {
      const isExpectedError = 
        error.code === "CALL_EXCEPTION" || 
        error.message?.includes("revert") ||
        error.message?.includes("timeout") ||
        error.message?.includes("zero");
      
      if (!isExpectedError) {
        console.error("Error getting quote:", error);
      }
      
      setOutputAmount("");
      
      if (error.message?.includes("timeout")) {
        setQuoteError("Quote request timed out. Please try again or enter minimum output manually.");
      } else if (error.code === "CALL_EXCEPTION" || error.message?.includes("revert")) {
        setQuoteError("No liquidity available for this swap. The pool may be empty or the route doesn't exist.");
      } else if (error.message?.includes("zero")) {
        setQuoteError("Invalid quote: output amount is zero. Please enter minimum output manually.");
      } else {
        setQuoteError("Quote not available. You can still swap by entering minimum output amount below.");
      }
    }
  };

  useEffect(() => {
    if (!inputAmount || parseFloat(inputAmount) <= 0 || !tokenAddress) {
      setOutputAmount("");
      setQuoteError(null);
      return;
    }

    if (!poolCreated) {
      setOutputAmount("");
      setQuoteError("Liquidity pool not created yet");
      return;
    }

    const timeoutId = setTimeout(() => {
      getQuote(inputAmount);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputAmount, isReversed, tokenAddress, tokenDecimals, poolCreated]);

  const handleApprove = async () => {
    if (!authenticated || !wallet || !tokenAddress) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      toast.error("Please enter an amount");
      return;
    }

    setIsApproving(true);
    try {
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      
      const amountInWei = ethers.parseUnits(inputAmount, tokenDecimals);
      
      const maxApproval = ethers.MaxUint256;
      
      toast.info("Confirm approval in your wallet...");
      const approveTx = await tokenContract.approve(AERODROME_ROUTER, maxApproval);
      
      toast.info("Waiting for approval confirmation...");
      await approveTx.wait();
      
      toast.success("Token approved successfully!");
    } catch (error: any) {
      console.error("Approve error:", error);
      if (error.code === 4001) {
        toast.error("Approval rejected");
      } else {
        toast.error("Approval failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsApproving(false);
    }
  };

  const handleSwap = async () => {
    if (!authenticated || !wallet || !tokenAddress) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      toast.error("Please enter an amount");
      return;
    }

    setIsSwapping(true);
    try {
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const routerContract = new ethers.Contract(AERODROME_ROUTER, AERODROME_ROUTER_ABI, signer);
      
      const amountIn = ethers.parseUnits(inputAmount, isReversed ? USDC_DECIMALS : tokenDecimals);
      
      let amountOutMin: bigint;
      if (quoteError && minOutputAmount && parseFloat(minOutputAmount) > 0) {
        const outputDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;
        amountOutMin = ethers.parseUnits(minOutputAmount, outputDecimals);
      } else if (outputAmount && parseFloat(outputAmount) > 0) {
        const outputDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;
        const outputAmountWei = ethers.parseUnits(outputAmount, outputDecimals);
        amountOutMin = outputAmountWei * BigInt(99) / BigInt(100);
      } else {
        throw new Error("Please enter a minimum output amount or wait for quote");
      }
      
      const path = isReversed 
        ? [USDC_ADDRESS, tokenAddress]
        : [tokenAddress, USDC_ADDRESS];
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      
      toast.info("Confirm swap in your wallet...");
      const swapTx = await routerContract.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        walletAddress,
        deadline
      );
      
      toast.info("Transaction submitted, waiting for confirmation...");
      const receipt = await swapTx.wait();
      
      toast.success("Swap completed successfully!");
      
      setInputAmount("");
      setOutputAmount("");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Swap error:", error);
      if (error.code === 4001) {
        toast.error("Swap rejected");
      } else if (error.message?.includes("revert")) {
        toast.error("Swap failed: " + (error.reason || error.message));
      } else {
        toast.error("Swap failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsSwapping(false);
    }
  };

  const inputToken = isReversed ? "USDC" : tokenSymbol;
  const outputToken = isReversed ? tokenSymbol : "USDC";
  const inputBalance = isReversed ? usdcBalance : tokenBalance;
  const inputTokenAddress = isReversed ? USDC_ADDRESS : tokenAddress;

  return (
    <div className="space-y-4">
      {!authenticated ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.03] border border-white/5">
          <Wallet className="h-8 w-8 text-white/40 mb-3" />
          <p className="text-sm text-white/60 text-center">
            Connect your wallet to swap tokens
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                From
              </label>
              {inputBalance !== null && (
                <span className="text-xs text-white/40">
                  Balance: {inputBalance} {inputToken}
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="h-14 bg-white/5 border-white/10 text-white text-lg font-bold pr-20 rounded-2xl"
                disabled={isSwapping || isApproving}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-sm font-bold text-white">{inputToken}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <button
              onClick={handleReverse}
              disabled={isSwapping || isApproving}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <ArrowUpDown className="h-4 w-4 text-white/60" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                To (Est.)
              </label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="0.0"
                value={outputAmount}
                readOnly
                className="h-14 bg-white/5 border-white/10 text-white/60 text-lg font-bold pr-20 rounded-2xl"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-sm font-bold text-white/60">{outputToken}</span>
              </div>
            </div>
            {quoteError && (
              <p className="text-xs text-orange-500/80 mt-1">
                {quoteError}
              </p>
            )}
            {quoteError && (
              <div className="space-y-1 mt-3">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  Minimum Output ({outputToken})
                </label>
                <Input
                  type="number"
                  placeholder="Enter minimum output"
                  value={minOutputAmount}
                  onChange={(e) => setMinOutputAmount(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 text-white text-sm font-bold rounded-xl"
                />
                <p className="text-xs text-white/40">
                  Enter the minimum amount you're willing to accept
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={handleApprove}
              disabled={!inputAmount || isApproving || isSwapping || parseFloat(inputAmount) <= 0}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider py-3 rounded-2xl disabled:opacity-50"
            >
              {isApproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                `Approve ${inputToken}`
              )}
            </Button>
            <Button
              onClick={handleSwap}
              disabled={!inputAmount || isSwapping || isApproving || parseFloat(inputAmount) <= 0}
              className="w-full bg-[#EC4E02] hover:bg-[#EC4E02]/90 text-white font-bold uppercase tracking-wider py-3 rounded-2xl disabled:opacity-50"
            >
              {isSwapping ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap"
              )}
            </Button>
          </div>

          <div className="text-xs text-white/40 text-center pt-2">
            Swap {tokenSymbol} ↔ USDC on Aerodrome
          </div>
        </>
      )}
    </div>
  );
}
