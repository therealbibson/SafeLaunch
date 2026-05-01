import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          The route you requested does not exist. Use the navigation above to return to the launchpad.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Go back home
        </Link>
      </div>
    </div>
  );
}
