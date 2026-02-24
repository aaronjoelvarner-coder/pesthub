import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">PestHub MVP</h1>
      <p>Field service management baseline for pest-control teams.</p>
      <div className="flex gap-3">
        <Link className="btn" href="/login">Login</Link>
        <Link className="btn" href="/admin/jobs">Admin Jobs</Link>
        <Link className="btn" href="/tech/today">Tech Today</Link>
      </div>
    </div>
  );
}
