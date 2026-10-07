"use client";

import { useActionState, useMemo, useState } from "react";
import type { ActionState } from "@/app/actions/applications";
import {
  INTERVIEW_TYPES,
  JOB_TYPES,
  JOB_TYPE_LABELS,
  STATUSES,
  type StatusValue,
} from "@/lib/constants";
import type { ApplicationDTO } from "@/lib/format";
import { toDateInputValue } from "@/lib/format";
import { parseApplicationForm } from "@/lib/validators";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  initial?: ApplicationDTO;
  submitLabel: string;
};

export function ApplicationForm({ action, initial, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [status, setStatus] = useState<StatusValue>(initial?.status ?? "Applied");
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const errors = useMemo(
    () => ({ ...state.errors, ...clientErrors }),
    [state.errors, clientErrors],
  );

  const showInterview = status === "Interview";

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const parsed = parseApplicationForm(new FormData(event.currentTarget));
        if (!parsed.data) {
          event.preventDefault();
          setClientErrors(parsed.errors as Record<string, string>);
        } else {
          setClientErrors({});
        }
      }}
      className="brutal-card bg-white p-5 sm:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company Name" error={errors.companyName} required>
          <input
            name="companyName"
            defaultValue={initial?.companyName}
            className="brutal-input"
            placeholder="Infosys"
          />
        </Field>
        <Field label="Job Role" error={errors.jobRole} required>
          <input
            name="jobRole"
            defaultValue={initial?.jobRole}
            className="brutal-input"
            placeholder="Software Engineer"
          />
        </Field>
        <Field label="Location" error={errors.location}>
          <input
            name="location"
            defaultValue={initial?.location ?? ""}
            className="brutal-input"
            placeholder="Bangalore"
          />
        </Field>
        <Field label="Job Type" error={errors.jobType}>
          <select name="jobType" defaultValue={initial?.jobType ?? ""} className="brutal-input">
            <option value="">Select type</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {JOB_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="CTC / Salary (LPA)" error={errors.ctc}>
          <input
            name="ctc"
            type="number"
            step="0.1"
            min="0"
            defaultValue={initial?.ctc ?? ""}
            className="brutal-input"
            placeholder="12"
          />
        </Field>
        <Field label="Application Date" error={errors.applicationDate} required>
          <input
            name="applicationDate"
            type="date"
            defaultValue={toDateInputValue(initial?.applicationDate)}
            className="brutal-input"
          />
        </Field>
        <Field label="Status" error={errors.status} required>
          <select
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusValue)}
            className="brutal-input"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Job URL" error={errors.jobUrl}>
          <input
            name="jobUrl"
            defaultValue={initial?.jobUrl ?? ""}
            className="brutal-input"
            placeholder="https://careers.company.com/job"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Notes" error={errors.notes}>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initial?.notes ?? ""}
            className="brutal-input min-h-28"
            placeholder="Completed online assessment. Need to prepare SQL and DSA."
          />
        </Field>
      </div>

      <div className="mt-6 border-[3px] border-ink bg-brutal-yellow/40 p-4 transition-all duration-300">
        <p className="font-display text-xl uppercase">Interview tracking</p>
        <p className="mt-1 text-sm font-semibold">
          Optional. Shown in full when status is Interview — you can still save without these fields.
        </p>
        <div
          className={`mt-4 grid gap-4 transition-all duration-300 md:grid-cols-2 ${
            showInterview ? "max-h-[800px] opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <Field label="Interview Date" error={errors.interviewDate}>
            <input
              name="interviewDate"
              type="date"
              defaultValue={toDateInputValue(initial?.interviewDate)}
              className="brutal-input"
            />
          </Field>
          <Field label="Interview Round" error={errors.interviewRound}>
            <input
              name="interviewRound"
              defaultValue={initial?.interviewRound ?? ""}
              className="brutal-input"
              placeholder="Round 1"
            />
          </Field>
          <Field label="Interview Type" error={errors.interviewType}>
            <select
              name="interviewType"
              defaultValue={initial?.interviewType ?? ""}
              className="brutal-input"
            >
              <option value="">Select type</option>
              {INTERVIEW_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Interview Notes" error={errors.interviewNotes}>
              <textarea
                name="interviewNotes"
                rows={3}
                defaultValue={initial?.interviewNotes ?? ""}
                className="brutal-input"
                placeholder="Technical interview scheduled."
              />
            </Field>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="brutal-btn mt-6 bg-ink px-5 py-3 font-black uppercase tracking-wide text-paper disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm font-black text-brutal-pink">{error}</span> : null}
    </label>
  );
}
