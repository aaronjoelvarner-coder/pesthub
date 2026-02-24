import { prisma } from '@/lib/prisma';

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr><th>Name</th><th>Phone</th><th>Email</th></tr></thead><tbody>{customers.map(c => <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td><td>{c.email}</td></tr>)}</tbody></table></div>
    </div>
  );
}
