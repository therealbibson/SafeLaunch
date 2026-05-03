import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celo Launchpad",
  description: "A MiniPay-powered launchpad interface for Celo projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <div className="flex min-h-full flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-200 bg-white/95 py-6">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6">
              Built for MiniPay and Celo. Use the launch page to connect and execute transactions.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
