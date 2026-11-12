import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import PrivyProviderWrapper from "@/components/providers/PrivyProviderWrapper";
import { HomeChatHeader } from "@/components/HomeChatHeader";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vibefund",
  description: "Fund your vibecoded applications",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${poppins.variable} antialiased dark`}
      >
        <PrivyProviderWrapper>
          <div>
            <Toaster position="bottom-right" richColors theme="dark" />
            <HomeChatHeader />
            {children}
            <Footer />
          </div>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
