import Link from "next/link";
import MiniPayLaunchpad from "@/components/MiniPayLaunchpad";

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">Launch</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">MiniPay Launchpad</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              This route contains the full MiniPay launch interface, including wallet connection, balance display, and proof-of-concept transaction flow.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            View projects
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <MiniPayLaunchpad />
        </div>
      </div>
    </div>
  );
}
