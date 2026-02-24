import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function TechTodayPage() {
  const start = new Date(); start.setHours(0,0,0,0);
  const end = new Date(start); end.setDate(end.getDate()+2);
  const jobs = await prisma.job.findMany({ where: { scheduledAt: { gte: start, lt: end } }, include: { property: true }, orderBy: { scheduledAt: 'asc' } });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Today + Tomorrow</h1>
      <p className="text-sm">Offline cache is prepared for these jobs. Pending sync appears on each job.</p>
      {jobs.map(job => (
        <div key={job.id} className="card flex justify-between">
          <div>
            <div className="font-medium">{job.property.address1}</div>
            <div className="text-sm">{new Date(job.scheduledAt).toLocaleString()} · {job.status}</div>
          </div>
          <Link className="btn" href={`/tech/job/${job.id}`}>Open</Link>
        </div>
      ))}
    </div>
  );
}
