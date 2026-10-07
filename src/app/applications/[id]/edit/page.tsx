import { notFound } from "next/navigation";
import { updateApplication } from "@/app/actions/applications";
import { ApplicationForm } from "@/components/ApplicationForm";
import { toApplicationDTO } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.application.findUnique({ where: { id } });
  if (!record) notFound();

  const action = updateApplication.bind(null, id);

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Update</p>
        <h1 className="font-display text-5xl uppercase leading-none">Edit application</h1>
        <p className="mt-3 max-w-2xl font-semibold">
          Change status, notes, salary, or interview details. Everything is saved to SQLite.
        </p>
      </header>
      <ApplicationForm
        action={action}
        initial={toApplicationDTO(record)}
        submitLabel="Save changes"
      />
    </div>
  );
}
