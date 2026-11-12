(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/wallet-privy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Privy Wallet Integration Utilities
 *
 * This file contains utility functions for working with Privy wallets.
 * The main wallet connection logic is handled by Privy's usePrivy and useWallets hooks.
 *
 * @see https://docs.privy.io/guide/react/wallets/usage
 */ /**
 * Copy wallet address to clipboard
 * @param address Wallet address to copy
 * @returns Promise that resolves when copied successfully
 */ __turbopack_context__.s([
    "copyAddressToClipboard",
    ()=>copyAddressToClipboard,
    "formatBalance",
    ()=>formatBalance,
    "formatWalletAddress",
    ()=>formatWalletAddress
]);
async function copyAddressToClipboard(address) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        await navigator.clipboard.writeText(address);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = address;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            throw new Error("Failed to copy address");
        } finally{
            document.body.removeChild(textArea);
        }
    }
}
function formatWalletAddress(address, startChars = 6, endChars = 4) {
    if (!address || address.length < startChars + endChars) {
        return address;
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
function formatBalance(balance, decimals = 18, displayDecimals = 4) {
    const balanceNum = typeof balance === 'string' ? parseFloat(balance) : balance;
    const divisor = Math.pow(10, decimals);
    const balanceInEth = balanceNum / divisor;
    return balanceInEth.toFixed(displayDecimals);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SwapInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapInterface",
    ()=>SwapInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/useWallets-gElyEQoU.mjs [app-client] (ecmascript) <export u as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Base network USDC address
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;
// Aerodrome Router Contract (Base network) - Official router address
const AERODROME_ROUTER = "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43";
// ERC20 Token ABI
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
];
// Aerodrome Router ABI (includes quote function)
const AERODROME_ROUTER_ABI = [
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"
];
function SwapInterface({ tokenAddress, tokenSymbol = "TOKEN", authenticated, poolCreated = false, poolAddress = null, crowdfundAddress = null }) {
    _s();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"])();
    const wallet = wallets[0];
    const walletAddress = wallet?.address;
    const [inputAmount, setInputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [outputAmount, setOutputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSwapping, setIsSwapping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isApproving, setIsApproving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tokenBalance, setTokenBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [usdcBalance, setUsdcBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingBalance, setIsLoadingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tokenDecimals, setTokenDecimals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(18);
    const [isReversed, setIsReversed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // false = token -> USDC, true = USDC -> token
    const [quoteError, setQuoteError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [minOutputAmount, setMinOutputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // For manual entry when quotes aren't available
    // Get token decimals
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapInterface.useEffect": ()=>{
            const fetchTokenDecimals = {
                "SwapInterface.useEffect.fetchTokenDecimals": async ()=>{
                    if (!tokenAddress || !wallet) return;
                    try {
                        const provider = await wallet.getEthereumProvider();
                        const ethersProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(provider);
                        const tokenContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(tokenAddress, ERC20_ABI, ethersProvider);
                        try {
                            const decimals = await tokenContract.decimals();
                            setTokenDecimals(Number(decimals));
                        } catch  {
                            // Default to 18 if decimals() fails
                            setTokenDecimals(18);
                        }
                    } catch (error) {
                        console.error("Error fetching token decimals:", error);
                    }
                }
            }["SwapInterface.useEffect.fetchTokenDecimals"];
            fetchTokenDecimals();
        }
    }["SwapInterface.useEffect"], [
        tokenAddress,
        wallet
    ]);
    // Fetch balances
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapInterface.useEffect": ()=>{
            const fetchBalances = {
                "SwapInterface.useEffect.fetchBalances": async ()=>{
                    if (!walletAddress || !wallet || !tokenAddress) {
                        setTokenBalance(null);
                        setUsdcBalance(null);
                        return;
                    }
                    setIsLoadingBalance(true);
                    try {
                        const provider = await wallet.getEthereumProvider();
                        const ethersProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(provider);
                        // Fetch token balance
                        const tokenContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(tokenAddress, ERC20_ABI, ethersProvider);
                        const tokenBalanceRaw = await tokenContract.balanceOf(walletAddress);
                        const tokenBalanceFormatted = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(tokenBalanceRaw, tokenDecimals);
                        setTokenBalance(Number(tokenBalanceFormatted).toFixed(4));
                        // Fetch USDC balance
                        const usdcContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(USDC_ADDRESS, ERC20_ABI, ethersProvider);
                        const usdcBalanceRaw = await usdcContract.balanceOf(walletAddress);
                        const usdcBalanceFormatted = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(usdcBalanceRaw, USDC_DECIMALS);
                        setUsdcBalance(Number(usdcBalanceFormatted).toFixed(2));
                    } catch (error) {
                        console.error("Error fetching balances:", error);
                    } finally{
                        setIsLoadingBalance(false);
                    }
                }
            }["SwapInterface.useEffect.fetchBalances"];
            fetchBalances();
        }
    }["SwapInterface.useEffect"], [
        walletAddress,
        wallet,
        tokenAddress,
        tokenDecimals
    ]);
    // Handle swap direction toggle
    const handleReverse = ()=>{
        setIsReversed(!isReversed);
        setInputAmount("");
        setOutputAmount("");
    };
    // Get quote from Aerodrome router contract directly
    const getQuote = async (amountIn)=>{
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
        // Only fetch quotes when pool is created
        if (!poolCreated) {
            setOutputAmount("");
            setQuoteError("Liquidity pool not created yet");
            return;
        }
        try {
            setQuoteError(null);
            // Convert input amount to wei
            const inputDecimals = isReversed ? USDC_DECIMALS : tokenDecimals;
            const amountInWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(amountIn, inputDecimals);
            // Set token addresses for swap path
            const path = isReversed ? [
                USDC_ADDRESS,
                tokenAddress
            ] : [
                tokenAddress,
                USDC_ADDRESS
            ];
            const buyTokenDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;
            // Get provider from wallet
            const provider = await wallet.getEthereumProvider();
            const ethersProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(provider);
            // Create router contract instance (read-only for quotes)
            const routerContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(AERODROME_ROUTER, AERODROME_ROUTER_ABI, ethersProvider);
            // Call getAmountsOut to get quote
            const amounts = await routerContract.getAmountsOut(amountInWei, path);
            // amounts[0] is input amount, amounts[1] is output amount
            const outputAmountWei = amounts[1];
            const outputAmountFormatted = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(outputAmountWei, buyTokenDecimals);
            // Format to appropriate decimal places
            const decimals = buyTokenDecimals === 6 ? 2 : 4;
            const formattedAmount = Number(outputAmountFormatted).toFixed(decimals);
            setOutputAmount(formattedAmount);
            setQuoteError(null);
        } catch (error) {
            // If quote fetching fails, show error message
            console.error("Error getting quote:", error);
            setOutputAmount("");
            setQuoteError("Quote not available. You can still swap by entering minimum output amount below.");
        }
    };
    // Debounce quote fetching to avoid too many API calls
    // Only fetch quotes when poolCreated is true
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapInterface.useEffect": ()=>{
            if (!inputAmount || parseFloat(inputAmount) <= 0 || !tokenAddress) {
                setOutputAmount("");
                setQuoteError(null);
                return;
            }
            // Only fetch quotes when pool is created
            if (!poolCreated) {
                setOutputAmount("");
                setQuoteError("Liquidity pool not created yet");
                return;
            }
            const timeoutId = setTimeout({
                "SwapInterface.useEffect.timeoutId": ()=>{
                    getQuote(inputAmount);
                }
            }["SwapInterface.useEffect.timeoutId"], 500); // 500ms debounce
            return ({
                "SwapInterface.useEffect": ()=>clearTimeout(timeoutId)
            })["SwapInterface.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["SwapInterface.useEffect"], [
        inputAmount,
        isReversed,
        tokenAddress,
        tokenDecimals,
        poolCreated
    ]);
    // Handle approve
    const handleApprove = async ()=>{
        if (!authenticated || !wallet || !tokenAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please connect your wallet");
            return;
        }
        if (!inputAmount || parseFloat(inputAmount) <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter an amount");
            return;
        }
        setIsApproving(true);
        try {
            const provider = await wallet.getEthereumProvider();
            const ethersProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const tokenContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(tokenAddress, ERC20_ABI, signer);
            // Convert input amount to wei
            const amountInWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(inputAmount, tokenDecimals);
            // Approve max amount for better UX (user only approves once)
            const maxApproval = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].MaxUint256;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Confirm approval in your wallet...");
            const approveTx = await tokenContract.approve(AERODROME_ROUTER, maxApproval);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Waiting for approval confirmation...");
            await approveTx.wait();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Token approved successfully!");
        } catch (error) {
            console.error("Approve error:", error);
            if (error.code === 4001) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Approval rejected");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Approval failed: " + (error.message || "Unknown error"));
            }
        } finally{
            setIsApproving(false);
        }
    };
    // Handle swap
    const handleSwap = async ()=>{
        if (!authenticated || !wallet || !tokenAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please connect your wallet");
            return;
        }
        if (!inputAmount || parseFloat(inputAmount) <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter an amount");
            return;
        }
        setIsSwapping(true);
        try {
            const provider = await wallet.getEthereumProvider();
            const ethersProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const routerContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(AERODROME_ROUTER, AERODROME_ROUTER_ABI, signer);
            // Convert amounts
            const amountIn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(inputAmount, isReversed ? USDC_DECIMALS : tokenDecimals);
            // Set minimum output amount
            // Use manual entry if quote isn't available, otherwise use quote with 1% slippage
            let amountOutMin;
            if (quoteError && minOutputAmount && parseFloat(minOutputAmount) > 0) {
                // Use manual entry
                const outputDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;
                amountOutMin = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(minOutputAmount, outputDecimals);
            } else if (outputAmount && parseFloat(outputAmount) > 0) {
                // Use quote with 1% slippage tolerance
                const outputDecimals = isReversed ? tokenDecimals : USDC_DECIMALS;
                const outputAmountWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(outputAmount, outputDecimals);
                amountOutMin = outputAmountWei * BigInt(99) / BigInt(100); // 1% slippage
            } else {
                throw new Error("Please enter a minimum output amount or wait for quote");
            }
            // Set swap path
            const path = isReversed ? [
                USDC_ADDRESS,
                tokenAddress
            ] : [
                tokenAddress,
                USDC_ADDRESS
            ];
            // Set deadline (20 minutes from now)
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Confirm swap in your wallet...");
            const swapTx = await routerContract.swapExactTokensForTokens(amountIn, amountOutMin, path, walletAddress, deadline);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Transaction submitted, waiting for confirmation...");
            const receipt = await swapTx.wait();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Swap completed successfully!");
            // Clear inputs and refresh balances
            setInputAmount("");
            setOutputAmount("");
            setTimeout(()=>{
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Swap error:", error);
            if (error.code === 4001) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Swap rejected");
            } else if (error.message?.includes("revert")) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Swap failed: " + (error.reason || error.message));
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Swap failed: " + (error.message || "Unknown error"));
            }
        } finally{
            setIsSwapping(false);
        }
    };
    const inputToken = isReversed ? "USDC" : tokenSymbol;
    const outputToken = isReversed ? tokenSymbol : "USDC";
    const inputBalance = isReversed ? usdcBalance : tokenBalance;
    const inputTokenAddress = isReversed ? USDC_ADDRESS : tokenAddress;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: !authenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.03] border border-white/5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                    className: "h-8 w-8 text-white/40 mb-3"
                }, void 0, false, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 350,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-white/60 text-center",
                    children: "Connect your wallet to swap tokens"
                }, void 0, false, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 351,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SwapInterface.tsx",
            lineNumber: 349,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-white/60 uppercase tracking-wider",
                                    children: "From"
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this),
                                inputBalance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-white/40",
                                    children: [
                                        "Balance: ",
                                        inputBalance,
                                        " ",
                                        inputToken
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 364,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "number",
                                    placeholder: "0.0",
                                    value: inputAmount,
                                    onChange: (e)=>setInputAmount(e.target.value),
                                    className: "h-14 bg-white/5 border-white/10 text-white text-lg font-bold pr-20 rounded-2xl",
                                    disabled: isSwapping || isApproving
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-white",
                                        children: inputToken
                                    }, void 0, false, {
                                        fileName: "[project]/components/SwapInterface.tsx",
                                        lineNumber: 379,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 358,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center -my-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleReverse,
                        disabled: isSwapping || isApproving,
                        className: "p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                            className: "h-4 w-4 text-white/60"
                        }, void 0, false, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 391,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SwapInterface.tsx",
                        lineNumber: 386,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 385,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-bold text-white/60 uppercase tracking-wider",
                                children: "To (Est.)"
                            }, void 0, false, {
                                fileName: "[project]/components/SwapInterface.tsx",
                                lineNumber: 398,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "text",
                                    placeholder: "0.0",
                                    value: outputAmount,
                                    readOnly: true,
                                    className: "h-14 bg-white/5 border-white/10 text-white/60 text-lg font-bold pr-20 rounded-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-white/60",
                                        children: outputToken
                                    }, void 0, false, {
                                        fileName: "[project]/components/SwapInterface.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this),
                        quoteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-orange-500/80 mt-1",
                            children: quoteError
                        }, void 0, false, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 415,
                            columnNumber: 15
                        }, this),
                        quoteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1 mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-white/60 uppercase tracking-wider",
                                    children: [
                                        "Minimum Output (",
                                        outputToken,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 422,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "number",
                                    placeholder: "Enter minimum output",
                                    value: minOutputAmount,
                                    onChange: (e)=>setMinOutputAmount(e.target.value),
                                    className: "h-12 bg-white/5 border-white/10 text-white text-sm font-bold rounded-xl"
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 425,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/40",
                                    children: "Enter the minimum amount you're willing to accept"
                                }, void 0, false, {
                                    fileName: "[project]/components/SwapInterface.tsx",
                                    lineNumber: 432,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 421,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 396,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleApprove,
                            disabled: !inputAmount || isApproving || isSwapping || parseFloat(inputAmount) <= 0,
                            className: "w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider py-3 rounded-2xl disabled:opacity-50",
                            children: isApproving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-4 w-4 mr-2 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SwapInterface.tsx",
                                        lineNumber: 448,
                                        columnNumber: 19
                                    }, this),
                                    "Approving..."
                                ]
                            }, void 0, true) : `Approve ${inputToken}`
                        }, void 0, false, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSwap,
                            disabled: !inputAmount || isSwapping || isApproving || parseFloat(inputAmount) <= 0,
                            className: "w-full bg-[#EC4E02] hover:bg-[#EC4E02]/90 text-white font-bold uppercase tracking-wider py-3 rounded-2xl disabled:opacity-50",
                            children: isSwapping ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-4 w-4 mr-2 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SwapInterface.tsx",
                                        lineNumber: 462,
                                        columnNumber: 19
                                    }, this),
                                    "Swapping..."
                                ]
                            }, void 0, true) : "Swap"
                        }, void 0, false, {
                            fileName: "[project]/components/SwapInterface.tsx",
                            lineNumber: 455,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 440,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-white/40 text-center pt-2",
                    children: [
                        "Swap ",
                        tokenSymbol,
                        " ↔ USDC on Aerodrome"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SwapInterface.tsx",
                    lineNumber: 472,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/SwapInterface.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_s(SwapInterface, "E98EuYTovrKnQQp5xns/s6IdOxs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"]
    ];
});
_c = SwapInterface;
var _c;
__turbopack_context__.k.register(_c, "SwapInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TradingChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradingChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TradingChart({ data }) {
    _s();
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!chartContainerRef.current) return;
            let chart;
            const initChart = {
                "TradingChart.useEffect.initChart": async ()=>{
                    const { createChart, ColorType } = await __turbopack_context__.A("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript, async loader)");
                    chart = createChart(chartContainerRef.current, {
                        layout: {
                            background: {
                                type: ColorType.Solid,
                                color: '#050505'
                            },
                            textColor: '#666'
                        },
                        grid: {
                            vertLines: {
                                color: '#1a1a1a'
                            },
                            horzLines: {
                                color: '#1a1a1a'
                            }
                        },
                        width: chartContainerRef.current.clientWidth,
                        height: chartContainerRef.current.clientHeight,
                        timeScale: {
                            borderColor: '#1a1a1a',
                            timeVisible: true,
                            secondsVisible: false
                        },
                        rightPriceScale: {
                            borderColor: '#1a1a1a'
                        },
                        crosshair: {
                            mode: 1,
                            vertLine: {
                                color: '#EC4E02',
                                width: 1,
                                style: 2,
                                labelBackgroundColor: '#EC4E02'
                            },
                            horzLine: {
                                color: '#EC4E02',
                                width: 1,
                                style: 2,
                                labelBackgroundColor: '#EC4E02'
                            }
                        }
                    });
                    const areaSeries = chart.addAreaSeries({
                        lineColor: '#2962FF',
                        topColor: 'rgba(41, 98, 255, 0.4)',
                        bottomColor: 'rgba(41, 98, 255, 0.0)',
                        lineWidth: 2
                    });
                    const defaultData = [
                        {
                            time: '2025-01-01',
                            value: 0.0487
                        },
                        {
                            time: '2025-01-02',
                            value: 0.0489
                        },
                        {
                            time: '2025-01-03',
                            value: 0.0492
                        },
                        {
                            time: '2025-01-04',
                            value: 0.0488
                        },
                        {
                            time: '2025-01-05',
                            value: 0.0495
                        },
                        {
                            time: '2025-01-06',
                            value: 0.0498
                        },
                        {
                            time: '2025-01-07',
                            value: 0.0494
                        },
                        {
                            time: '2025-01-08',
                            value: 0.0497
                        },
                        {
                            time: '2025-01-09',
                            value: 0.0493
                        },
                        {
                            time: '2025-01-10',
                            value: 0.0490
                        },
                        {
                            time: '2025-01-11',
                            value: 0.0496
                        },
                        {
                            time: '2025-01-12',
                            value: 0.0499
                        },
                        {
                            time: '2025-01-13',
                            value: 0.0495
                        },
                        {
                            time: '2025-01-14',
                            value: 0.0491
                        },
                        {
                            time: '2025-01-15',
                            value: 0.0489
                        }
                    ];
                    areaSeries.setData(data || defaultData);
                    chart.timeScale().fitContent();
                    const handleResize = {
                        "TradingChart.useEffect.initChart.handleResize": ()=>{
                            if (chartContainerRef.current && chart) {
                                chart.applyOptions({
                                    width: chartContainerRef.current.clientWidth,
                                    height: chartContainerRef.current.clientHeight
                                });
                            }
                        }
                    }["TradingChart.useEffect.initChart.handleResize"];
                    window.addEventListener('resize', handleResize);
                    return ({
                        "TradingChart.useEffect.initChart": ()=>{
                            window.removeEventListener('resize', handleResize);
                            if (chart) {
                                chart.remove();
                            }
                        }
                    })["TradingChart.useEffect.initChart"];
                }
            }["TradingChart.useEffect.initChart"];
            initChart();
            return ({
                "TradingChart.useEffect": ()=>{
                    if (chart) {
                        chart.remove();
                    }
                }
            })["TradingChart.useEffect"];
        }
    }["TradingChart.useEffect"], [
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: chartContainerRef,
        className: "w-full h-full",
        style: {
            minHeight: '400px'
        }
    }, void 0, false, {
        fileName: "[project]/components/TradingChart.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(TradingChart, "ZI1LdXO604IZpmh0kAttG3FSLiA=");
_c = TradingChart;
var _c;
__turbopack_context__.k.register(_c, "TradingChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PoolDetailsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$Bh4N2Hpm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-Bh4N2Hpm.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/useWallets-gElyEQoU.mjs [app-client] (ecmascript) <export u as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wallet-privy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SwapInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SwapInterface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TradingChart.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// Extended CL Pool ABI
const CL_POOL_ABI = [
    "function liquidity() view returns (uint256)",
    "function token0() view returns (address)",
    "function token1() view returns (address)",
    "function fee() view returns (uint24)",
    "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)"
];
// ERC-20 ABI
const ERC20_ABI = [
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
];
// Pool Factory ABI to get pool creation info
const POOL_FACTORY_ABI = [
    "event PoolCreated(address indexed token0, address indexed token1, uint24 indexed fee, int24 tickSpacing, address pool)"
];
function PoolDetailsClient({ poolAddress }) {
    _s();
    const [poolData, setPoolData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [presaleData, setPresaleData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chartData, setChartData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("24h");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedAddress, setCopiedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$Bh4N2Hpm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"])();
    const walletAddress = wallets[0]?.address || null;
    // RPC endpoints with fallbacks
    const rpcUrls = [
        "https://base.llamarpc.com",
        "https://base-mainnet.g.alchemy.com/v2/demo",
        "https://mainnet.base.org",
        "https://1rpc.io/base"
    ];
    // Get provider with fallback
    const getProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[getProvider]": async ()=>{
            let lastError = null;
            for (const url of rpcUrls){
                try {
                    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(url);
                    await provider.getBlockNumber();
                    return provider;
                } catch (err) {
                    lastError = err;
                    continue;
                }
            }
            throw lastError || new Error("All RPC endpoints failed");
        }
    }["PoolDetailsClient.useCallback[getProvider]"], []);
    // Helper function to fetch pool stats for a specific address
    const fetchPoolStatsForAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": async (address, provider)=>{
            try {
                const poolContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(address, CL_POOL_ABI, provider);
                // Fetch basic pool data with better error handling
                let liquidity, token0, token1, slot0, fee;
                try {
                    [liquidity, token0, token1, slot0, fee] = await Promise.all([
                        poolContract.liquidity().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": (e)=>{
                                console.warn("Failed to fetch liquidity:", e.message);
                                return null;
                            }
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                        poolContract.token0().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": (e)=>{
                                console.warn("Failed to fetch token0:", e.message);
                                return null;
                            }
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                        poolContract.token1().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": (e)=>{
                                console.warn("Failed to fetch token1:", e.message);
                                return null;
                            }
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                        poolContract.slot0().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": (e)=>{
                                console.warn("Failed to fetch slot0:", e.message);
                                return null;
                            }
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                        poolContract.fee().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": (e)=>{
                                console.warn("Failed to fetch fee:", e.message);
                                return null;
                            }
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"])
                    ]);
                } catch (error) {
                    console.error("Error calling pool contract:", error);
                    // Try with minimal ABI (just token0 and token1)
                    const minimalABI = [
                        "function token0() view returns (address)",
                        "function token1() view returns (address)"
                    ];
                    const minimalContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(address, minimalABI, provider);
                    [token0, token1] = await Promise.all([
                        minimalContract.token0().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                        minimalContract.token1().catch({
                            "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                        }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"])
                    ]);
                    liquidity = null;
                    slot0 = null;
                    fee = null;
                }
                console.log("📊 Fetched pool data:", {
                    token0,
                    token1,
                    liquidity: liquidity !== null,
                    fee: fee !== null
                });
                if (!token0 || !token1) {
                    console.error("❌ Missing token0 or token1:", {
                        token0,
                        token1
                    });
                    throw new Error("Pool contract does not have token0 or token1. This might not be a valid CL pool.");
                }
                // Fetch token info
                const token0Contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(token0, ERC20_ABI, provider);
                const token1Contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(token1, ERC20_ABI, provider);
                const [token0Symbol, token0Name, token0Decimals, token1Symbol, token1Name, token1Decimals] = await Promise.all([
                    token0Contract.symbol().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                    token0Contract.name().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                    token0Contract.decimals().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                    token1Contract.symbol().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                    token1Contract.name().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]),
                    token1Contract.decimals().catch({
                        "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"])
                ]);
                // Calculate reserves (simplified - would need actual pool balance calls)
                const token0Reserve = await token0Contract.balanceOf(address).catch({
                    "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]);
                const token1Reserve = await token1Contract.balanceOf(address).catch({
                    "PoolDetailsClient.useCallback[fetchPoolStatsForAddress]": ()=>null
                }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"]);
                // Format liquidity
                let formattedLiquidity = null;
                let tvl = null;
                if (liquidity) {
                    const liquidityBigInt = BigInt(liquidity.toString());
                    const liquidityUSDC = Number(liquidityBigInt) / 1e6;
                    formattedLiquidity = `$${liquidityUSDC.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`;
                    tvl = formattedLiquidity;
                }
                // Calculate price (simplified - would need proper sqrtPriceX96 calculation)
                let price = null;
                if (slot0 && token0Decimals && token1Decimals) {
                    const sqrtPriceX96 = slot0[0];
                    // Simplified price calculation
                    const priceNum = Number(sqrtPriceX96) ** 2 / 2 ** 192;
                    price = `$${priceNum.toFixed(6)}`;
                }
                // Format reserves
                const formatReserve = {
                    "PoolDetailsClient.useCallback[fetchPoolStatsForAddress].formatReserve": (reserve, decimals)=>{
                        if (!reserve || !decimals) return null;
                        const amount = Number(reserve) / 10 ** decimals;
                        return amount.toLocaleString(undefined, {
                            maximumFractionDigits: 6
                        });
                    }
                }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress].formatReserve"];
                return {
                    liquidity: formattedLiquidity,
                    token0,
                    token1,
                    token0Symbol,
                    token1Symbol,
                    token0Name,
                    token1Name,
                    token0Decimals,
                    token1Decimals,
                    token0Reserve: formatReserve(token0Reserve, token0Decimals),
                    token1Reserve: formatReserve(token1Reserve, token1Decimals),
                    fee: fee ? `${Number(fee) / 10000}%` : null,
                    price,
                    priceChange24h: "+2.5%",
                    volume24h: "$12,345",
                    tvl,
                    lpCount: null,
                    createdAt: null,
                    creator: null
                };
            } catch (err) {
                console.error("Error fetching pool stats for address:", address, err);
                throw err;
            }
        }
    }["PoolDetailsClient.useCallback[fetchPoolStatsForAddress]"], []);
    // Fetch pool statistics
    const fetchPoolStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[fetchPoolStats]": async ()=>{
            try {
                const provider = await getProvider();
                // First, validate address format
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].isAddress(poolAddress)) {
                    throw new Error(`Invalid address format: ${poolAddress}`);
                }
                // First, verify the address is a contract
                console.log("🔍 Checking if address is a contract:", poolAddress);
                let code;
                try {
                    code = await provider.getCode(poolAddress);
                    console.log("📦 Contract code length:", code?.length || 0);
                    if (!code || code === "0x" || code.length < 10) {
                        // Address has no code - might be EOA or not deployed yet
                        console.warn("⚠️ Address has no code, will try to find pool from presale contract in main fetch");
                        throw new Error(`Address ${poolAddress} is not a contract or has no code`);
                    }
                } catch (err) {
                    console.error("❌ Contract verification failed:", err);
                    throw err;
                }
                // If we get here, the address has code, so fetch pool stats
                return await fetchPoolStatsForAddress(poolAddress, provider);
            } catch (err) {
                console.error("Error in fetchPoolStats:", err);
                throw err;
            }
        }
    }["PoolDetailsClient.useCallback[fetchPoolStats]"], [
        poolAddress,
        getProvider,
        fetchPoolStatsForAddress
    ]);
    // Fetch transaction history from BaseScan
    const fetchTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[fetchTransactions]": async ()=>{
            try {
                // BaseScan API endpoint
                const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASESCAN_API_KEY || "";
                const url = `https://api.basescan.org/api?module=account&action=txlist&address=${poolAddress}&startblock=0&endblock=99999999&page=1&offset=5&sort=desc&apikey=${apiKey}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch transactions");
                const data = await response.json();
                if (data.status !== "1" || !data.result) return [];
                // Parse transactions (simplified - would need to parse actual swap/add/remove events)
                const txs = data.result.slice(0, 5).map({
                    "PoolDetailsClient.useCallback[fetchTransactions].txs": (tx)=>({
                            hash: tx.hash,
                            type: "swap",
                            timestamp: parseInt(tx.timeStamp),
                            amount0: "0",
                            amount1: "0",
                            from: tx.from,
                            to: tx.to
                        })
                }["PoolDetailsClient.useCallback[fetchTransactions].txs"]);
                return txs;
            } catch (err) {
                console.error("Error fetching transactions:", err);
                return [];
            }
        }
    }["PoolDetailsClient.useCallback[fetchTransactions]"], [
        poolAddress
    ]);
    // Fetch chart data
    const fetchChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[fetchChartData]": async (range)=>{
            try {
                // Generate mock data based on time range
                // In production, this would fetch from DEX aggregator or on-chain data
                const now = Date.now();
                let startTime;
                let points;
                switch(range){
                    case "1h":
                        startTime = now - 3600000;
                        points = 60;
                        break;
                    case "24h":
                        startTime = now - 86400000;
                        points = 24;
                        break;
                    case "7d":
                        startTime = now - 7 * 86400000;
                        points = 7;
                        break;
                    case "30d":
                        startTime = now - 30 * 86400000;
                        points = 30;
                        break;
                    default:
                        startTime = now - 90 * 86400000;
                        points = 90;
                }
                const data = [];
                const interval = (now - startTime) / points;
                let basePrice = 0.05;
                for(let i = 0; i < points; i++){
                    const time = new Date(startTime + i * interval).toISOString();
                    basePrice += (Math.random() - 0.5) * 0.01;
                    data.push({
                        time,
                        value: Math.max(0.01, basePrice)
                    });
                }
                return data;
            } catch (err) {
                console.error("Error fetching chart data:", err);
                return [];
            }
        }
    }["PoolDetailsClient.useCallback[fetchChartData]"], []);
    // Main data fetch
    const fetchAllData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PoolDetailsClient.useCallback[fetchAllData]": async (isRefresh = false)=>{
            if (isRefresh) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }
            setError(null);
            try {
                // Fetch pool stats first - if this fails, we should show an error
                console.log("🚀 Starting to fetch pool data for:", poolAddress);
                let stats;
                try {
                    stats = await fetchPoolStats();
                    console.log("✅ Pool stats fetched:", stats ? "Success" : "Null");
                    if (!stats) {
                        throw new Error("Pool contract returned no data. This might not be a valid CL pool.");
                    }
                    setPoolData(stats);
                    console.log("✅ Pool data set successfully");
                } catch (err) {
                    console.error("❌ Failed to fetch pool stats:", err);
                    console.error("Error details:", {
                        message: err.message,
                        stack: err.stack,
                        poolAddress
                    });
                    throw err; // Re-throw to be caught by outer catch
                }
                // Fetch other data in parallel (these can fail without breaking the page)
                const [txs, chart] = await Promise.all([
                    fetchTransactions().catch({
                        "PoolDetailsClient.useCallback[fetchAllData]": (err)=>{
                            console.warn("Failed to fetch transactions:", err);
                            return [];
                        }
                    }["PoolDetailsClient.useCallback[fetchAllData]"]),
                    fetchChartData(timeRange).catch({
                        "PoolDetailsClient.useCallback[fetchAllData]": (err)=>{
                            console.warn("Failed to fetch chart data:", err);
                            return [];
                        }
                    }["PoolDetailsClient.useCallback[fetchAllData]"])
                ]);
                setTransactions(txs);
                setChartData(chart);
                // Fetch presale data to potentially get the correct pool address
                const backendUrl = ("TURBOPACK compile-time value", "http://localhost:3001") || "http://localhost:3001";
                const response = await fetch(`${backendUrl}/api/presales`, {
                    headers: {
                        Accept: "application/json"
                    },
                    cache: "no-store"
                });
                let actualPoolAddress = poolAddress; // Default to the provided address
                if (response.ok) {
                    const payload = await response.json();
                    const presale = (payload.data || []).find({
                        "PoolDetailsClient.useCallback[fetchAllData].presale": (p)=>p.pool === poolAddress || p.liquidityPool === poolAddress || p.crowdfundAddress
                    }["PoolDetailsClient.useCallback[fetchAllData].presale"]);
                    if (presale) {
                        let logoUrl = null;
                        if (presale.appLogo) {
                            if (typeof presale.appLogo === "string") {
                                if (presale.appLogo.startsWith("http")) {
                                    logoUrl = presale.appLogo;
                                } else {
                                    const logoPath = presale.appLogo.startsWith("/") ? presale.appLogo : `/${presale.appLogo}`;
                                    logoUrl = `${backendUrl}${logoPath}`;
                                }
                            }
                        }
                        setPresaleData({
                            _id: presale._id,
                            appName: presale.appName || "Unknown",
                            appLogo: logoUrl,
                            tickerName: presale.tickerName || "TOKEN",
                            description: presale.description || "",
                            erc20Symbol: presale.erc20Symbol,
                            erc20Name: presale.erc20Name,
                            appXHandle: presale.appXHandle,
                            isXConnected: presale.isXConnected || false,
                            appLink: presale.appLink,
                            creator: presale.creator,
                            totalRaised: presale.totalRaised,
                            contributorCount: presale.contributorCount || 0,
                            contractStartTime: presale.contractStartTime,
                            endTime: presale.endTime,
                            crowdfundAddress: presale.crowdfundAddress,
                            poolLauncherToken: presale.poolLauncherToken,
                            tokenToPair: presale.tokenToPair,
                            projectToken: presale.projectToken
                        });
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load pool data");
                console.error("Error fetching pool data:", err);
            } finally{
                setIsLoading(false);
                setIsRefreshing(false);
            }
        }
    }["PoolDetailsClient.useCallback[fetchAllData]"], [
        poolAddress,
        fetchPoolStats,
        fetchTransactions,
        fetchChartData,
        timeRange
    ]);
    // Initial load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PoolDetailsClient.useEffect": ()=>{
            fetchAllData();
        }
    }["PoolDetailsClient.useEffect"], [
        fetchAllData
    ]);
    // Auto-refresh every 1 minute
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PoolDetailsClient.useEffect": ()=>{
            const interval = setInterval({
                "PoolDetailsClient.useEffect.interval": ()=>{
                    fetchAllData(true);
                }
            }["PoolDetailsClient.useEffect.interval"], 60000); // 1 minute
            return ({
                "PoolDetailsClient.useEffect": ()=>clearInterval(interval)
            })["PoolDetailsClient.useEffect"];
        }
    }["PoolDetailsClient.useEffect"], [
        fetchAllData
    ]);
    // Update chart when time range changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PoolDetailsClient.useEffect": ()=>{
            fetchChartData(timeRange).then(setChartData);
        }
    }["PoolDetailsClient.useEffect"], [
        timeRange,
        fetchChartData
    ]);
    const copyToClipboard = (text, label)=>{
        navigator.clipboard.writeText(text);
        setCopiedAddress(label);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Address copied to clipboard");
        setTimeout(()=>setCopiedAddress(null), 2000);
    };
    const formatUSDC = (value)=>{
        if (!value) return "$0.00";
        try {
            const num = BigInt(value);
            const usdc = Number(num) / 1e6;
            return `$${usdc.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        } catch  {
            return "$0.00";
        }
    };
    const formatTime = (timestamp)=>{
        return new Date(timestamp * 1000).toLocaleString();
    };
    const getTransactionTypeLabel = (type)=>{
        switch(type){
            case "swap":
                return "Swap";
            case "add":
                return "Add Liquidity";
            case "remove":
                return "Remove Liquidity";
            default:
                return "Transaction";
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-black flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC4E02] mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/60",
                        children: "Loading pool data..."
                    }, void 0, false, {
                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                lineNumber: 564,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
            lineNumber: 563,
            columnNumber: 7
        }, this);
    }
    if (error || !poolData && !isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-black flex items-center justify-center px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "h-8 w-8 text-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 578,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-xl font-bold mb-2",
                                children: "Failed to load pool data"
                            }, void 0, false, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 580,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60 text-sm mb-2",
                                children: error || "Pool not found"
                            }, void 0, false, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 581,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/40 text-xs mb-4",
                                children: [
                                    "Pool Address: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(poolAddress)
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 583,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 582,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left bg-white/5 rounded-lg p-4 text-xs text-white/60 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-white/80 mb-2",
                                        children: "Possible reasons:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 586,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc list-inside space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "The address might not be a valid CL pool contract"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 588,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "The pool contract might not exist on Base network"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 589,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "RPC endpoints might be temporarily unavailable"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "The contract ABI might not match the pool implementation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 591,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 587,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 585,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                        lineNumber: 576,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    children: "Go Back"
                                }, void 0, false, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 597,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 596,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>{
                                    setError(null);
                                    fetchAllData();
                                },
                                className: "bg-[#EC4E02] hover:bg-[#EC4E02]/80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, this),
                                    "Retry"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                        lineNumber: 595,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                lineNumber: 575,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
            lineNumber: 574,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-white/10 bg-[#0F0F10]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 622,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Back to Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 623,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fetchAllData(true),
                                disabled: isRefreshing,
                                className: "inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "Refresh"
                                    }, void 0, false, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                lineNumber: 625,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                        lineNumber: 620,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                    lineNumber: 619,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
                                        children: [
                                            presaleData?.appLogo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: presaleData.appLogo,
                                                    alt: presaleData.appName,
                                                    fill: true,
                                                    className: "object-cover",
                                                    unoptimized: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 649,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-bold text-white mb-2 truncate",
                                                        children: [
                                                            presaleData?.appName || "Pool",
                                                            " (",
                                                            presaleData?.tickerName || "TOKEN",
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 19
                                                    }, this),
                                                    presaleData?.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/60 text-sm mb-4 line-clamp-2",
                                                        children: presaleData.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-4 text-sm",
                                                        children: [
                                                            presaleData?.appLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: presaleData.appLink,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "flex items-center gap-1 text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 674,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Website"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 675,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 676,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 23
                                                            }, this),
                                                            presaleData?.appXHandle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `https://x.com/${presaleData.appXHandle}`,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "flex items-center gap-1 text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "@",
                                                                            presaleData.appXHandle
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 687,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                        lineNumber: 666,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 659,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 642,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.1
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Pool Statistics"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 702,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/60 text-xs",
                                                            children: "TVL"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 705,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-bold text-lg",
                                                            children: poolData.tvl || "--"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/60 text-xs",
                                                            children: "24h Volume"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-bold text-lg",
                                                            children: poolData.volume24h || "--"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 710,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/60 text-xs",
                                                            children: "Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white font-bold text-lg",
                                                                    children: poolData.price || "--"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 715,
                                                                    columnNumber: 21
                                                                }, this),
                                                                poolData.priceChange24h && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-xs font-semibold ${poolData.priceChange24h.startsWith("+") ? "text-green-500" : "text-red-500"}`,
                                                                    children: poolData.priceChange24h
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 717,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/60 text-xs",
                                                            children: "Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-bold text-lg",
                                                            children: poolData.fee || "--"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 729,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 703,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 696,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.2
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-white",
                                                    children: "Price Chart"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 742,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        "1h",
                                                        "24h",
                                                        "7d",
                                                        "30d",
                                                        "all"
                                                    ].map((range)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setTimeRange(range),
                                                            className: `px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${timeRange === range ? "bg-[#EC4E02] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`,
                                                            children: range.toUpperCase()
                                                        }, range, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 741,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-64 w-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                data: chartData
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 760,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 759,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 735,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.3
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-white",
                                                    children: "Recent Transactions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `https://basescan.org/address/${poolAddress}#tokentxns`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "text-sm text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors flex items-center gap-1",
                                                    children: [
                                                        "View All",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 771,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: transactions.length > 0 ? transactions.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `p-2 rounded-lg ${tx.type === "swap" ? "bg-blue-500/20 text-blue-500" : tx.type === "add" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`,
                                                                    children: tx.type === "swap" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 801,
                                                                        columnNumber: 29
                                                                    }, this) : tx.type === "add" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 803,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 805,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 791,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white font-semibold text-sm",
                                                                            children: getTransactionTypeLabel(tx.type)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 809,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white/60 text-xs truncate",
                                                                            children: formatTime(tx.timestamp)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 810,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 808,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `https://basescan.org/tx/${tx.hash}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors ml-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                lineNumber: 819,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 813,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, tx.hash, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 786,
                                                    columnNumber: 21
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-center py-8",
                                                children: "No transactions found"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 824,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 783,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 765,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.4
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Pool Information"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 836,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Liquidity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: poolData.liquidity || "--"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 838,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Token 0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 843,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                poolData.token0Symbol && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/80 text-sm font-semibold",
                                                                    children: poolData.token0Symbol
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 846,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono text-sm",
                                                                    children: poolData.token0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(poolData.token0) : "--"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 848,
                                                                    columnNumber: 21
                                                                }, this),
                                                                poolData.token0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>copyToClipboard(poolData.token0, "token0"),
                                                                            className: "text-white/40 hover:text-white transition-colors",
                                                                            children: copiedAddress === "token0" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 858,
                                                                                columnNumber: 29
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 860,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 853,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: `https://basescan.org/address/${poolData.token0}`,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 869,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 863,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 844,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 842,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Token 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 876,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                poolData.token1Symbol && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/80 text-sm font-semibold",
                                                                    children: poolData.token1Symbol
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 879,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono text-sm",
                                                                    children: poolData.token1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(poolData.token1) : "--"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 21
                                                                }, this),
                                                                poolData.token1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>copyToClipboard(poolData.token1, "token1"),
                                                                            className: "text-white/40 hover:text-white transition-colors",
                                                                            children: copiedAddress === "token1" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 891,
                                                                                columnNumber: 29
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 893,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 886,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: `https://basescan.org/address/${poolData.token1}`,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                                lineNumber: 902,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                            lineNumber: 896,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 877,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 875,
                                                    columnNumber: 17
                                                }, this),
                                                poolData.token0Reserve && poolData.token1Reserve && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between py-3 border-b border-white/5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/60",
                                                                    children: "Token 0 Reserve"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 911,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-bold",
                                                                    children: poolData.token0Reserve
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 912,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 910,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between py-3 border-b border-white/5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/60",
                                                                    children: "Token 1 Reserve"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 915,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-bold",
                                                                    children: poolData.token1Reserve
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 916,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 914,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                poolData.lpCount !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Liquidity Providers"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 922,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: poolData.lpCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 923,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 19
                                                }, this),
                                                poolData.createdAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 929,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Created"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 928,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: formatTime(poolData.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 932,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 19
                                                }, this),
                                                poolData.creator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Creator"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 937,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono text-sm",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(poolData.creator)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 939,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://basescan.org/address/${poolData.creator}`,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 946,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 940,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 938,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 936,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Pool Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 952,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono text-sm",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(poolAddress)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 954,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>copyToClipboard(poolAddress, "pool"),
                                                                    className: "text-white/40 hover:text-white transition-colors",
                                                                    children: copiedAddress === "pool" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 960,
                                                                        columnNumber: 25
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 962,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 955,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://basescan.org/address/${poolAddress}`,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 971,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 965,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 951,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 837,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 830,
                                    columnNumber: 13
                                }, this),
                                presaleData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.5
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Presale Information"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 986,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                presaleData.totalRaised && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 991,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Total Raised"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 990,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: formatUSDC(presaleData.totalRaised)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 994,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 989,
                                                    columnNumber: 21
                                                }, this),
                                                presaleData.contributorCount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3 border-b border-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 1000,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Contributors"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 999,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: presaleData.contributorCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1003,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 998,
                                                    columnNumber: 21
                                                }, this),
                                                presaleData.creator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "Creator"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono text-sm",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$privy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(presaleData.creator)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 1010,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://basescan.org/address/${presaleData.creator}`,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                        lineNumber: 1017,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                    lineNumber: 1011,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1009,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1007,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 987,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 980,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                            lineNumber: 640,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.3
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Swap"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 15
                                        }, this),
                                        presaleData?.projectToken ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SwapInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapInterface"], {
                                            tokenAddress: presaleData.projectToken,
                                            tokenSymbol: presaleData.tickerName || presaleData.erc20Symbol || "TOKEN",
                                            poolCreated: true,
                                            poolAddress: poolAddress,
                                            crowdfundAddress: presaleData.crowdfundAddress || null
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-8 text-white/60",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Loading token information..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                lineNumber: 1047,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1046,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 1030,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.4
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Liquidity"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1059,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "w-full bg-[#EC4E02] hover:bg-[#EC4E02]/80 text-white",
                                                    onClick: ()=>{
                                                        window.open(`https://aerodrome.finance/pools/${poolAddress}`, "_blank");
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-4 w-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1067,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Add Liquidity"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1061,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "w-full border-white/20 hover:bg-white/10",
                                                    onClick: ()=>{
                                                        window.open(`https://aerodrome.finance/pools/${poolAddress}`, "_blank");
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                            className: "h-4 w-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1077,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Remove Liquidity"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1070,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `https://aerodrome.finance/pools/${poolAddress}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "block w-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        className: "w-full border-white/20 hover:bg-white/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "h-4 w-4 mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                                lineNumber: 1087,
                                                                columnNumber: 21
                                                            }, this),
                                                            "View on Aerodrome"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                        lineNumber: 1086,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1060,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 1053,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.5
                                    },
                                    className: "bg-[#0F0F10] border border-white/10 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-white mb-4",
                                            children: "Quick Stats"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 text-sm",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs font-bold",
                                                            children: "Active"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 text-sm",
                                                            children: "Network"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white text-sm font-bold",
                                                            children: "Base"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 17
                                                }, this),
                                                poolData.fee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 text-sm",
                                                            children: "Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1113,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white text-sm font-bold",
                                                            children: poolData.fee
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                            lineNumber: 1114,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                            lineNumber: 1102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                                    lineNumber: 1095,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                            lineNumber: 1028,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                    lineNumber: 638,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/pool/[poolAddress]/PoolDetailsClient.tsx",
        lineNumber: 616,
        columnNumber: 5
    }, this);
}
_s(PoolDetailsClient, "/he9/LPwvRpW0DYxLFfA+a3I3Ok=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$Bh4N2Hpm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$gElyEQoU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"]
    ];
});
_c = PoolDetailsClient;
var _c;
__turbopack_context__.k.register(_c, "PoolDetailsClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_63716bf9._.js.map