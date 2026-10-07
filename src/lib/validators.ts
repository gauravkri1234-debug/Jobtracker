import {
  INTERVIEW_TYPES,
  JOB_TYPES,
  STATUSES,
  type InterviewTypeValue,
  type JobTypeValue,
  type StatusValue,
} from "@/lib/constants";

export type FormErrors = Partial<Record<string, string>>;

export type ParsedApplication = {
  companyName: string;
  jobRole: string;
  location: string | null;
  jobType: JobTypeValue | null;
  ctc: number | null;
  applicationDate: Date;
  status: StatusValue;
  jobUrl: string | null;
  notes: string | null;
  interviewDate: Date | null;
  interviewRound: string | null;
  interviewType: InterviewTypeValue | null;
  interviewNotes: string | null;
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseApplicationForm(formData: FormData): {
  data?: ParsedApplication;
  errors: FormErrors;
} {
  const companyName = String(formData.get("companyName") ?? "").trim();
  const jobRole = String(formData.get("jobRole") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const jobTypeRaw = String(formData.get("jobType") ?? "").trim();
  const ctcRaw = String(formData.get("ctc") ?? "").trim();
  const applicationDateRaw = String(formData.get("applicationDate") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "").trim();
  const jobUrl = String(formData.get("jobUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const interviewDateRaw = String(formData.get("interviewDate") ?? "").trim();
  const interviewRound = String(formData.get("interviewRound") ?? "").trim();
  const interviewTypeRaw = String(formData.get("interviewType") ?? "").trim();
  const interviewNotes = String(formData.get("interviewNotes") ?? "").trim();

  const errors: FormErrors = {};

  if (!companyName) errors.companyName = "Company name is required.";
  if (!jobRole) errors.jobRole = "Job role is required.";
  if (!applicationDateRaw) {
    errors.applicationDate = "Application date is required.";
  } else if (Number.isNaN(Date.parse(applicationDateRaw))) {
    errors.applicationDate = "Application date must be a valid date.";
  }
  if (!statusRaw) {
    errors.status = "Status is required.";
  } else if (!STATUSES.includes(statusRaw as StatusValue)) {
    errors.status = "Status is invalid.";
  }
  if (jobUrl && !isValidUrl(jobUrl)) {
    errors.jobUrl = "Job URL must be a valid URL.";
  }
  if (ctcRaw) {
    const ctc = Number(ctcRaw);
    if (!Number.isFinite(ctc) || ctc < 0) {
      errors.ctc = "CTC/salary must be a valid number.";
    }
  }
  if (jobTypeRaw && !JOB_TYPES.includes(jobTypeRaw as JobTypeValue)) {
    errors.jobType = "Job type is invalid.";
  }
  if (
    interviewTypeRaw &&
    !INTERVIEW_TYPES.includes(interviewTypeRaw as InterviewTypeValue)
  ) {
    errors.interviewType = "Interview type is invalid.";
  }
  if (interviewDateRaw && Number.isNaN(Date.parse(interviewDateRaw))) {
    errors.interviewDate = "Interview date must be a valid date.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    errors: {},
    data: {
      companyName,
      jobRole,
      location: location || null,
      jobType: (jobTypeRaw as JobTypeValue) || null,
      ctc: ctcRaw ? Number(ctcRaw) : null,
      applicationDate: new Date(applicationDateRaw),
      status: statusRaw as StatusValue,
      jobUrl: jobUrl || null,
      notes: notes || null,
      interviewDate: interviewDateRaw ? new Date(interviewDateRaw) : null,
      interviewRound: interviewRound || null,
      interviewType: (interviewTypeRaw as InterviewTypeValue) || null,
      interviewNotes: interviewNotes || null,
    },
  };
}
