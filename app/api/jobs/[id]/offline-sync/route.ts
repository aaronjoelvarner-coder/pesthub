import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logJobEvent } from '@/lib/audit';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await req.json();
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: 'Job missing' }, { status: 404 });

  if (job.updatedAt > new Date(payload.clientBaseUpdatedAt || 0)) {
    return NextResponse.json({ conflict: true, message: 'Dispatcher updated job while offline. Confirm override.' }, { status: 409 });
  }

  await prisma.job.update({ where: { id: params.id }, data: { status: payload.status, notes: payload.notes, hasPendingOffline: false } });
  await logJobEvent(params.id, payload.actorId || 'tech-offline', 'OFFLINE_SYNC', payload);
  return NextResponse.json({ ok: true });
}
