import { STATUS_COLORS, type StatusValue } from "@/lib/constants";

export function StatusBadge({ status }: { status: StatusValue }) {
  return (
    <span
      className={`inline-flex items-center border-[3px] border-ink px-2 py-0.5 text-xs font-black uppercase tracking-wide ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );
}
