import { prisma } from './prisma';

export async function logJobEvent(jobId: string, actorId: string, type: string, payload: unknown = {}) {
  return prisma.jobEvent.create({ data: { jobId, actorId, type, payload: payload as object } });
}
