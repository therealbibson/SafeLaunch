import Link from "next/link";

const projects = [
  {
    name: "Solar DAO",
    description: "Community-owned renewable energy funding on Celo.",
    status: "Active",
    raised: "42,000 USDm",
  },
  {
    name: "Green Microloans",
    description: "Small loans for local entrepreneurs in emerging markets.",
    status: "Draft",
    raised: "0 USDm",
  },
  {
    name: "NextGen Wallet",
    description: "A mobile-first Celo app for low-cost payments.",
    status: "Published",
    raised: "120,500 USDm",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Projects</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Launchpad Projects</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Review active launchpad efforts, draft proposals, and project performance metrics.
            </p>
          </div>
          <Link
            href="/launch"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Launch another project
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{project.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                  {project.status}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-600">
                <span>Raised</span>
                <strong className="text-slate-900">{project.raised}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
