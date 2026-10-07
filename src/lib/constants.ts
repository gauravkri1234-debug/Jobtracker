export const STATUSES = [
  "Applied",
  "Shortlisted",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export type StatusValue = (typeof STATUSES)[number];

export const JOB_TYPES = [
  "FullTime",
  "Internship",
  "PartTime",
  "Contract",
] as const;

export type JobTypeValue = (typeof JOB_TYPES)[number];

export const INTERVIEW_TYPES = [
  "Technical",
  "HR",
  "Managerial",
  "Online",
  "Offline",
] as const;

export type InterviewTypeValue = (typeof INTERVIEW_TYPES)[number];

export const JOB_TYPE_LABELS: Record<JobTypeValue, string> = {
  FullTime: "Full Time",
  Internship: "Internship",
  PartTime: "Part Time",
  Contract: "Contract",
};

export const STATUS_COLORS: Record<StatusValue, string> = {
  Applied: "bg-[#3DFFF3]",
  Shortlisted: "bg-[#B8FF3C]",
  Assessment: "bg-[#FFE500]",
  Interview: "bg-[#FF8A3D]",
  Offer: "bg-[#C6FF4D]",
  Rejected: "bg-[#FF3D8A]",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "company-asc", label: "Company Name A-Z" },
  { value: "company-desc", label: "Company Name Z-A" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];
