import { prisma } from '@/lib/prisma';

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({ include: { job: true, payments: true }, orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr><th>ID</th><th>Job</th><th>Status</th><th>Total</th><th>Payments</th></tr></thead><tbody>{invoices.map(i => <tr key={i.id}><td>{i.id.slice(0,8)}</td><td>{i.jobId.slice(0,8)}</td><td>{i.status}</td><td>{i.totalCents/100}</td><td>{i.payments.length}</td></tr>)}</tbody></table></div>
    </div>
  );
}
