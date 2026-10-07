"use client";

import { useState, useTransition } from "react";
import { deleteApplication } from "@/app/actions/applications";

export function DeleteButton({
  id,
  label = "Delete",
}: {
  id: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="brutal-btn bg-brutal-pink px-3 py-2 text-xs font-black uppercase"
      >
        {label}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md border-[3px] border-ink bg-paper p-6 shadow-[10px_10px_0_0_#111]">
            <p className="font-display text-2xl uppercase">Delete application?</p>
            <p className="mt-3 font-semibold">
              Are you sure you want to delete this application?
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="brutal-btn bg-white px-4 py-2 text-sm font-black uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await deleteApplication(id);
                  })
                }
                className="brutal-btn bg-brutal-pink px-4 py-2 text-sm font-black uppercase disabled:opacity-60"
              >
                {pending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
