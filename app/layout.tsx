import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
          <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
                Celo Launchpad
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
                <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  Home
                </Link>
                <Link href="/launch" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  Launch
                </Link>
                <Link href="/projects" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  Projects
                </Link>
                <Link href="/wallet" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  Wallet
                </Link>
                <Link href="/settings" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  Settings
                </Link>
              </nav>
            </div>
          </header>

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
