import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-600">Settings</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Launchpad Settings</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Configure your experience, theme, and default launch behavior before you deploy.
            </p>
          </div>
          <Link
            href="/launch"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Back to launchpad
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Interface</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">Theme</p>
                <p className="mt-1 text-sm text-slate-600">Automatic dark/light mode support.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">Notifications</p>
                <p className="mt-1 text-sm text-slate-600">Enable alerts when a launch transaction is confirmed.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Network</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">Celo mainnet only</p>
                <p className="mt-1 text-sm text-slate-600">This launchpad currently targets Celo Mainnet via MiniPay.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">Transaction currency</p>
                <p className="mt-1 text-sm text-slate-600">USDm is used for fee payment and demo transfers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
