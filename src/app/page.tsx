import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusChart } from "@/components/StatusChart";
import { STATUSES, STATUS_COLORS, type StatusValue } from "@/lib/constants";
import { formatDate, toApplicationDTO } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const applications = await prisma.application.findMany({
    orderBy: { applicationDate: "desc" },
  });

  const counts = Object.fromEntries(STATUSES.map((status) => [status, 0])) as Record<
    StatusValue,
    number
  >;
  for (const app of applications) {
    counts[app.status] += 1;
  }

  const recent = applications.slice(0, 6).map(toApplicationDTO);
  const cards: { label: string; value: number; className: string }[] = [
    { label: "Total Applications", value: applications.length, className: "bg-brutal-yellow" },
    ...STATUSES.map((status) => ({
      label: status === "Assessment" ? "Assessments" : status === "Interview" ? "Interviews" : `${status}${status === "Offer" ? "s" : ""}`,
      value: counts[status],
      className: STATUS_COLORS[status],
    })),
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-rise">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">JobTrack</p>
          <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">Dashboard</h1>
          <p className="mt-3 max-w-xl text-lg font-semibold">
            One board for every application, interview, and offer in your hunt.
          </p>
        </div>
        <Link
          href="/applications/new"
          className="brutal-btn inline-flex bg-ink px-5 py-3 text-center font-black uppercase text-paper"
        >
          Add Application
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <article
            key={card.label}
            className={`brutal-card p-4 ${card.className} animate-rise`}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">{card.label}</p>
            <p className="mt-2 font-display text-5xl leading-none">{card.value}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="brutal-card overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b-[3px] border-ink bg-paper px-5 py-4">
            <h2 className="font-display text-3xl uppercase">Recent applications</h2>
            <Link href="/applications" className="font-black uppercase underline decoration-[3px] underline-offset-4">
              View all
            </Link>
          </div>
          <div className="divide-y-[3px] divide-ink">
            {recent.map((app) => (
              <div key={app.id} className="grid gap-3 px-5 py-4 transition-colors duration-200 hover:bg-brutal-cyan/30 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-display text-2xl uppercase">{app.companyName}</p>
                  <p className="font-semibold">{app.jobRole}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest">
                    {app.location ?? "—"} · {formatDate(app.applicationDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={app.status} />
                  <Link
                    href={`/applications/${app.id}`}
                    className="brutal-btn bg-white px-3 py-2 text-xs font-black uppercase"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
            {recent.length === 0 ? (
              <p className="px-5 py-8 font-black uppercase">No applications yet. Add your first one.</p>
            ) : null}
          </div>
        </section>

        <StatusChart counts={counts} />
      </div>
    </div>
  );
}
