import { Role } from '@prisma/client';

export function canAccessJob(role: Role, assignedTechId: string | null, userId: string) {
  if (role === Role.ADMIN || role === Role.DISPATCHER) return true;
  return role === Role.TECH && assignedTechId === userId;
}
