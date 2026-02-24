import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.invoiceLineItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.jobChecklistItem.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.jobEvent.deleteMany();
  await prisma.job.deleteMany();
  await prisma.property.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const pass = await bcrypt.hash('password123', 10);
  const [admin, dispatcher, tech1, tech2] = await Promise.all([
    prisma.user.create({ data: { name: 'Admin', email: 'admin@pesthub.local', passwordHash: pass, role: Role.ADMIN } }),
    prisma.user.create({ data: { name: 'Dispatch', email: 'dispatch@pesthub.local', passwordHash: pass, role: Role.DISPATCHER } }),
    prisma.user.create({ data: { name: 'Tech One', email: 'tech1@pesthub.local', passwordHash: pass, role: Role.TECH } }),
    prisma.user.create({ data: { name: 'Tech Two', email: 'tech2@pesthub.local', passwordHash: pass, role: Role.TECH } })
  ]);

  const customer = await prisma.customer.create({ data: { name: 'Acme Apartments', phone: '+15550000001', email: 'ops@acme.test' } });
  const property = await prisma.property.create({ data: { customerId: customer.id, address1: '100 Main St', city: 'Austin', state: 'TX', postalCode: '78701' } });
  const now = new Date();
  await prisma.job.createMany({ data: [
    { customerId: customer.id, propertyId: property.id, assignedTechId: tech1.id, scheduledAt: now, status: 'SCHEDULED' },
    { customerId: customer.id, propertyId: property.id, assignedTechId: tech2.id, scheduledAt: new Date(now.getTime() + 3600000), status: 'SCHEDULED' }
  ]});

  console.log({ admin: admin.email, dispatcher: dispatcher.email, tech1: tech1.email, password: 'password123' });
}

main().finally(() => prisma.$disconnect());
