import Link from "next/link";

export default function NotFound() {
  return (
    <div className="brutal-card bg-brutal-yellow p-8">
      <h1 className="font-display text-5xl uppercase">Not found</h1>
      <p className="mt-3 font-semibold">That application does not exist.</p>
      <Link href="/applications" className="brutal-btn mt-6 inline-flex bg-ink px-4 py-2 font-black uppercase text-paper">
        Back to applications
      </Link>
    </div>
  );
}
