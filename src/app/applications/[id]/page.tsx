import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/DeleteButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Toast } from "@/components/Toast";
import { formatCtc, formatDate, formatJobType, toApplicationDTO } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ toast?: string }>;
}) {
  const { id } = await params;
  const { toast } = await searchParams;
  const record = await prisma.application.findUnique({ where: { id } });
  if (!record) notFound();
  const app = toApplicationDTO(record);

  return (
    <div className="space-y-6">
      <Toast value={toast} />
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Details</p>
          <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">{app.companyName}</h1>
          <p className="mt-3 text-2xl font-black">{app.jobRole}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {app.jobUrl ? (
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn bg-brutal-cyan px-4 py-2 font-black uppercase"
            >
              View Job Posting ↗
            </a>
          ) : null}
          <Link
            href={`/applications/${app.id}/edit`}
            className="brutal-btn bg-brutal-yellow px-4 py-2 font-black uppercase"
          >
            Edit
          </Link>
          <DeleteButton id={app.id} />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Detail label="Location" value={app.location ?? "—"} />
        <Detail label="Job Type" value={formatJobType(app.jobType)} />
        <Detail label="CTC" value={formatCtc(app.ctc)} />
        <article className="brutal-card bg-white p-5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">Status</p>
          <div className="mt-3">
            <StatusBadge status={app.status} />
          </div>
        </article>
        <Detail label="Applied" value={formatDate(app.applicationDate)} />
        {app.jobUrl ? (
          <article className="brutal-card bg-white p-5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">Job Link</p>
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-black uppercase underline decoration-[3px] underline-offset-4"
            >
              View Job Posting
            </a>
          </article>
        ) : null}
      </section>

      <article className="brutal-card bg-white p-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">Notes</p>
        <p className="mt-3 whitespace-pre-wrap text-lg font-semibold">
          {app.notes || "No notes yet."}
        </p>
      </article>

      {app.status === "Interview" || app.interviewDate || app.interviewRound || app.interviewType || app.interviewNotes ? (
        <section className="brutal-card bg-brutal-orange p-5">
          <h2 className="font-display text-3xl uppercase">Interview tracking</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Detail label="Interview Date" value={app.interviewDate ? formatDate(app.interviewDate) : "—"} />
            <Detail label="Interview Round" value={app.interviewRound ?? "—"} />
            <Detail label="Interview Type" value={app.interviewType ?? "—"} />
            <article className="brutal-card bg-white p-5 md:col-span-2">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">Interview Notes</p>
              <p className="mt-3 whitespace-pre-wrap font-semibold">
                {app.interviewNotes || "No interview notes."}
              </p>
            </article>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <article className="brutal-card bg-white p-5">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </article>
  );
}
