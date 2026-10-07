import Link from "next/link";
import { ApplicationsExplorer } from "@/components/ApplicationsExplorer";
import { Toast } from "@/components/Toast";
import { toApplicationDTO } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string }>;
}) {
  const { toast } = await searchParams;
  const applications = await prisma.application.findMany({
    orderBy: { applicationDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <Toast value={toast} />
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Inbox</p>
          <h1 className="font-display text-5xl uppercase leading-none">Applications</h1>
        </div>
        <Link
          href="/applications/new"
          className="brutal-btn bg-ink px-5 py-3 text-center font-black uppercase text-paper"
        >
          Add Application
        </Link>
      </header>
      <ApplicationsExplorer applications={applications.map(toApplicationDTO)} />
    </div>
  );
}
