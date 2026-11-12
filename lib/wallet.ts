export interface WalletConnection {
  address: string;
  chainId: string;
}

export async function getMetamaskWallet(): Promise<WalletConnection> {
  if (typeof window === "undefined") {
    throw new Error("Window object not available");
  }

  if (!window.ethereum) {
    throw new Error(
      "MetaMask is not installed. Please install MetaMask extension.",
    );
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask.");
    }

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    return {
      address: accounts[0] as string,
      chainId: chainId as string,
    };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("User rejected the connection request");
    }
    throw error;
  }
}

export function isMetaMaskInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.ethereum !== "undefined";
}

export function onAccountsChanged(
  callback: (accounts: string[]) => void,
): void {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
}

export function onChainChanged(callback: (chainId: string) => void): void {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("chainChanged", callback);
  }
}

export function removeWalletListeners(): void {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
  }
}

export function disconnectWallet(): void {
  console.log("Wallet disconnected from app");
}

export async function copyAddressToClipboard(address: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Window object not available");
  }

  try {
    await navigator.clipboard.writeText(address);
  } catch (error) {
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
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

export async function getWalletBalance(address: string): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Window object not available");
  }

  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const balanceWei = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    const balanceInEth = parseInt(balanceWei as string, 16) / 1e18;

    return balanceInEth.toFixed(4);
  } catch (error) {
    console.error("Failed to get wallet balance:", error);
    throw error;
  }
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeAllListeners: (event: string) => void;
      isMetaMask?: boolean;
    };
  }
}
