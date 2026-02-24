import { prisma } from '@/lib/prisma';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ include: { property: true, assignedTech: true, events: { take: 1, orderBy: { createdAt: 'desc' } } }, orderBy: { scheduledAt: 'asc' } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Jobs (trust view)</h1>
      <div className="card overflow-auto">
        <table className="w-full text-sm"><thead><tr><th>When</th><th>Property</th><th>Status</th><th>Tech</th><th>Last Actor</th><th>Pending Offline</th></tr></thead><tbody>{jobs.map(j => <tr key={j.id}><td>{new Date(j.scheduledAt).toLocaleString()}</td><td>{j.property.address1}</td><td>{j.status}</td><td>{j.assignedTech?.name || '-'}</td><td>{j.events[0]?.actorId || '-'}</td><td>{j.hasPendingOffline ? 'Yes' : 'No'}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
