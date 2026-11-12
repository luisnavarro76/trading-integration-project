"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;

  if (!appId) {
    throw new Error(
      "Missing NEXT_PUBLIC_PRIVY_APP_ID. Set it in your environment before running the app.",
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      clientId={clientId}
      config={{
        // Customize appearance
        appearance: {
          theme: "dark",
          accentColor: "#EC4E02",
          logo: "/logo.png", // Your app logo
          landingHeader: "Welcome to Vibefund",
          showWalletLoginFirst: true,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        // Supported login methods
        loginMethods: ["wallet"],
        // Legal URLs (optional but recommended)
        legal: {
          termsAndConditionsUrl: "https://vibefund.ing/terms",
          privacyPolicyUrl: "https://vibefund.ing/privacy",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
