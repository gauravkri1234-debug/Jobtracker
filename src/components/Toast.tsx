"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MESSAGES: Record<string, string> = {
  created: "Application added successfully.",
  updated: "Application updated successfully.",
  deleted: "Application deleted successfully.",
};

export function Toast({ value }: { value?: string }) {
  const router = useRouter();
  const message = value ? MESSAGES[value] : undefined;

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("toast");
      router.replace(`${url.pathname}${url.search}`);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [message, router]);

  if (!message) return null;

  return (
    <div className="animate-toast pointer-events-none fixed right-4 top-4 z-50 max-w-sm border-[3px] border-ink bg-brutal-lime px-4 py-3 shadow-[6px_6px_0_0_#111] font-black">
      {message}
    </div>
  );
}
