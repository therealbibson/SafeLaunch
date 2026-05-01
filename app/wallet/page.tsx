import Link from "next/link";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">Wallet</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Connected Wallet</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              View wallet state, addresses, and network data for your Celo launchpad session.
            </p>
          </div>
          <Link
            href="/settings"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Open settings
          </Link>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Wallet address</p>
            <p className="mt-3 text-lg font-medium text-slate-900">0x0000…0000</p>
            <p className="mt-2 text-sm text-slate-600">Connect MiniPay to display your live Celo address and balances.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Network</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">Celo Mainnet</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Balance</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">0 USDm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
