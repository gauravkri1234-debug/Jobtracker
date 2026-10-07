"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/applications/new", label: "Add Application" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/applications/new") return pathname === "/applications/new";
    if (href === "/applications") {
      return pathname.startsWith("/applications") && pathname !== "/applications/new";
    }
    return pathname === href;
  };

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-brutal-yellow lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-display text-2xl uppercase tracking-tight">
            JobTrack
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="brutal-btn bg-white px-3 py-1 text-sm font-black uppercase"
            aria-label="Toggle navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open ? (
          <nav className="grid gap-2 border-t-[3px] border-ink bg-paper p-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`brutal-btn px-4 py-3 text-sm font-black uppercase ${
                  isActive(link.href) ? "bg-ink text-paper" : "bg-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r-[3px] border-ink bg-ink text-paper lg:flex lg:flex-col">
        <div className="border-b-[3px] border-paper/20 p-6">
          <Link href="/" className="font-display text-4xl uppercase leading-none">
            Job
            <br />
            Track
          </Link>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-brutal-yellow">
            Track every hunt
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-3 p-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-[3px] px-4 py-3 font-black uppercase tracking-wide transition-all duration-200 ${
                isActive(link.href)
                  ? "border-paper bg-brutal-yellow text-ink shadow-[4px_4px_0_0_#ffe500]"
                  : "border-paper/20 hover:-translate-y-0.5 hover:border-paper hover:bg-paper hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t-[3px] border-paper/20 p-4 font-mono text-[10px] uppercase tracking-widest text-paper/70">
          Single-user v1
        </div>
      </aside>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
