import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const plans = await prisma.servicePlan.findMany({ where: { active: true } });
  for (const plan of plans) {
    const until = new Date();
    until.setDate(until.getDate() + plan.lookaheadDays);
    if (plan.nextRunDate <= until) {
      await prisma.job.create({ data: { customerId: plan.customerId, propertyId: plan.propertyId, scheduledAt: plan.nextRunDate, status: 'SCHEDULED' } });
      const next = new Date(plan.nextRunDate);
      next.setMonth(next.getMonth() + (plan.frequency === 'QUARTERLY' ? 3 : 1));
      await prisma.servicePlan.update({ where: { id: plan.id }, data: { nextRunDate: next } });
    }
  }
}

run().finally(() => prisma.$disconnect());
