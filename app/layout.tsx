import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "ElyraX";

export const metadata: Metadata = {
  title: `${brandName} — Discord Bot Dashboard`,
  description: "Advanced moderation, automation, security and community tools unified in one powerful Discord bot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background min-h-screen">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
