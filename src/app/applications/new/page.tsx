import { createApplication } from "@/app/actions/applications";
import { ApplicationForm } from "@/components/ApplicationForm";

export default function NewApplicationPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">New record</p>
        <h1 className="font-display text-5xl uppercase leading-none">Add application</h1>
        <p className="mt-3 max-w-2xl font-semibold">
          Log a company, role, and status. Notes, salary, and interview details are optional.
        </p>
      </header>
      <ApplicationForm action={createApplication} submitLabel="Save application" />
    </div>
  );
}
