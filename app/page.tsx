import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">Launchpad</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                Build on Celo with MiniPay
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A polished UI for launching Celo projects, managing wallet state, and previewing project details across dedicated routes.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/launch"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Open launchpad
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  See projects
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-200/10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Your app routes</p>
              <div className="mt-8 space-y-5 text-sm leading-7 text-slate-300">
                <div>
                  <p className="font-semibold text-white">/launch</p>
                  <p>Connect MiniPay and begin launching Celo projects from the launchpad.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">/projects</p>
                  <p>Review your active launchpad projects and draft proposals.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">/wallet</p>
                  <p>View wallet state and network information for the connected account.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">/settings</p>
                  <p>Update launch preferences, network options, and UI settings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Designed for MiniPay</h2>
            <p className="mt-3 text-slate-600">
              This app is built around the MiniPay browser environment and Celo transaction flows. Open the launch page in MiniPay for the full experience.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Ready-to-use routes</h2>
            <p className="mt-3 text-slate-600">
              Navigation is now scaffolded for launch, projects, wallet state, and settings so you can expand each area independently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
