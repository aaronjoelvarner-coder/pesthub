import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canTransition } from '@/lib/state-machine';
import { logJobEvent } from '@/lib/audit';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { status, actorId, role, override } = await req.json();
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!canTransition(job.status, status, role) && !override) return NextResponse.json({ error: 'Invalid transition' }, { status: 400 });

  const updated = await prisma.job.update({ where: { id: params.id }, data: { status, hasPendingOffline: false } });
  await logJobEvent(params.id, actorId, override ? 'STATUS_OVERRIDE' : 'STATUS_CHANGED', { from: job.status, to: status });

  if (status === 'COMPLETED') {
    await prisma.invoice.create({ data: { jobId: job.id, status: 'DRAFT', totalCents: 12900, lineItems: { create: [{ description: 'General Pest Service', quantity: 1, unitPriceCents: 12900 }] } } });
  }

  return NextResponse.json(updated);
}
