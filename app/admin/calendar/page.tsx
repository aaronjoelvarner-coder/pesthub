import { prisma } from '@/lib/prisma';

export default async function CalendarPage() {
  const jobs = await prisma.job.findMany({ include: { assignedTech: true }, orderBy: { scheduledAt: 'asc' }, take: 40 });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Calendar (Day/Week)</h1>
      <div className="grid gap-2">{jobs.map(j => <div key={j.id} className="card flex justify-between"><div>{new Date(j.scheduledAt).toLocaleString()} - {j.status}</div><div>{j.assignedTech?.name || 'Unassigned'}</div></div>)}</div>
    </div>
  );
}
