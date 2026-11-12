/**
 * Privy Wallet Integration Utilities
 *
 * This file contains utility functions for working with Privy wallets.
 * The main wallet connection logic is handled by Privy's usePrivy and useWallets hooks.
 *
 * @see https://docs.privy.io/guide/react/wallets/usage
 */

/**
 * Copy wallet address to clipboard
 * @param address Wallet address to copy
 * @returns Promise that resolves when copied successfully
 */
export async function copyAddressToClipboard(address: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Window object not available");
  }

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
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Format wallet address for display
 * @param address Full wallet address
 * @param startChars Number of characters to show at start (default: 6)
 * @param endChars Number of characters to show at end (default: 4)
 * @returns Formatted address like "0x1234...5678"
 */
export function formatWalletAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format balance for display
 * @param balance Balance in Wei or smallest unit
 * @param decimals Number of decimal places (default: 18 for ETH)
 * @param displayDecimals Number of decimals to display (default: 4)
 * @returns Formatted balance string
 */
export function formatBalance(
  balance: string | number,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  const balanceNum = typeof balance === 'string' ? parseFloat(balance) : balance;
  const divisor = Math.pow(10, decimals);
  const balanceInEth = balanceNum / divisor;
  return balanceInEth.toFixed(displayDecimals);
}
