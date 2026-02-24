import { prisma } from '@/lib/prisma';

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({ include: { customer: true } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Properties</h1>
      <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr><th>Customer</th><th>Address</th><th>City</th><th>State</th></tr></thead><tbody>{properties.map(p => <tr key={p.id}><td>{p.customer.name}</td><td>{p.address1}</td><td>{p.city}</td><td>{p.state}</td></tr>)}</tbody></table></div>
    </div>
  );
}
