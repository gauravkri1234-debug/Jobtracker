import { JOB_TYPE_LABELS, type JobTypeValue } from "@/lib/constants";

export function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatCtc(value: number | null | undefined) {
  if (value == null) return "—";
  return `₹${value.toLocaleString("en-IN")} LPA`;
}

export function formatJobType(value: JobTypeValue | null | undefined) {
  if (!value) return "—";
  return JOB_TYPE_LABELS[value];
}

export function toDateInputValue(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toISOString().slice(0, 10);
}

export type ApplicationDTO = {
  id: string;
  companyName: string;
  jobRole: string;
  location: string | null;
  jobType: JobTypeValue | null;
  ctc: number | null;
  applicationDate: string;
  status: import("@/lib/constants").StatusValue;
  jobUrl: string | null;
  notes: string | null;
  interviewDate: string | null;
  interviewRound: string | null;
  interviewType: import("@/lib/constants").InterviewTypeValue | null;
  interviewNotes: string | null;
  createdAt: string;
};

export function toApplicationDTO(app: {
  id: string;
  companyName: string;
  jobRole: string;
  location: string | null;
  jobType: JobTypeValue | null;
  ctc: number | null;
  applicationDate: Date;
  status: import("@/lib/constants").StatusValue;
  jobUrl: string | null;
  notes: string | null;
  interviewDate: Date | null;
  interviewRound: string | null;
  interviewType: import("@/lib/constants").InterviewTypeValue | null;
  interviewNotes: string | null;
  createdAt: Date;
}): ApplicationDTO {
  return {
    id: app.id,
    companyName: app.companyName,
    jobRole: app.jobRole,
    location: app.location,
    jobType: app.jobType,
    ctc: app.ctc,
    applicationDate: app.applicationDate.toISOString(),
    status: app.status,
    jobUrl: app.jobUrl,
    notes: app.notes,
    interviewDate: app.interviewDate?.toISOString() ?? null,
    interviewRound: app.interviewRound,
    interviewType: app.interviewType,
    interviewNotes: app.interviewNotes,
    createdAt: app.createdAt.toISOString(),
  };
}
