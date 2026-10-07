"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DeleteButton } from "@/components/DeleteButton";
import { StatusBadge } from "@/components/StatusBadge";
import { SORT_OPTIONS, STATUSES, type SortValue, type StatusValue } from "@/lib/constants";
import { formatCtc, formatDate, formatJobType, type ApplicationDTO } from "@/lib/format";

export function ApplicationsExplorer({ applications }: { applications: ApplicationDTO[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | StatusValue>("All");
  const [sort, setSort] = useState<SortValue>("newest");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = applications.filter((app) => {
      const matchesSearch =
        !needle ||
        app.companyName.toLowerCase().includes(needle) ||
        app.jobRole.toLowerCase().includes(needle) ||
        (app.location ?? "").toLowerCase().includes(needle);
      const matchesStatus = status === "All" || app.status === status;
      return matchesSearch && matchesStatus;
    });

    next.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
      }
      if (sort === "oldest") {
        return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
      }
      if (sort === "company-asc") {
        return a.companyName.localeCompare(b.companyName);
      }
      return b.companyName.localeCompare(a.companyName);
    });

    return next;
  }, [applications, query, sort, status]);

  return (
    <div className="space-y-5">
      <div className="brutal-card grid gap-3 bg-white p-4 md:grid-cols-3">
        <label className="block md:col-span-1">
          <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="brutal-input"
            placeholder="Company, role, or location"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "All" | StatusValue)}
            className="brutal-input"
          >
            <option value="All">All</option>
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
            Sort
          </span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortValue)}
            className="brutal-input"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="font-mono text-xs font-bold uppercase tracking-widest">
        Showing {filtered.length} of {applications.length}
      </p>

      <div className="hidden overflow-x-auto border-[3px] border-ink bg-white shadow-[6px_6px_0_0_#111] md:block">
        <table className="w-full min-w-[860px] text-left">
          <thead className="bg-ink text-paper">
            <tr className="font-mono text-xs uppercase tracking-widest">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Job Type</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-t-[3px] border-ink transition-colors duration-200 hover:bg-brutal-yellow/40">
                <td className="px-4 py-3 font-black">{app.companyName}</td>
                <td className="px-4 py-3 font-semibold">{app.jobRole}</td>
                <td className="px-4 py-3">{app.location ?? "—"}</td>
                <td className="px-4 py-3">{formatJobType(app.jobType)}</td>
                <td className="px-4 py-3">{formatCtc(app.ctc)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3">{formatDate(app.applicationDate)}</td>
                <td className="px-4 py-3">
                  <RowActions id={app.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {filtered.map((app) => (
          <article key={app.id} className="brutal-card bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl uppercase">{app.companyName}</h2>
                <p className="font-semibold">{app.jobRole}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <p className="mt-3 text-sm font-semibold">
              {app.location ?? "—"} · {formatJobType(app.jobType)} · {formatCtc(app.ctc)}
            </p>
            <p className="mt-1 font-mono text-xs uppercase">{formatDate(app.applicationDate)}</p>
            <div className="mt-4">
              <RowActions id={app.id} />
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="brutal-card hatched bg-white p-8 text-center font-black uppercase">
          No matching applications.
        </div>
      ) : null}
    </div>
  );
}

function RowActions({ id }: { id: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`/applications/${id}`} className="brutal-btn bg-brutal-cyan px-3 py-2 text-xs font-black uppercase">
        View
      </Link>
      <Link href={`/applications/${id}/edit`} className="brutal-btn bg-brutal-yellow px-3 py-2 text-xs font-black uppercase">
        Edit
      </Link>
      <DeleteButton id={id} />
    </div>
  );
}
