import { JobStatus, Role } from '@prisma/client';

const allowed: Record<JobStatus, JobStatus[]> = {
  SCHEDULED: ['EN_ROUTE'],
  EN_ROUTE: ['ON_SITE'],
  ON_SITE: ['COMPLETED'],
  COMPLETED: ['INVOICED'],
  INVOICED: ['PAID'],
  PAID: []
};

export function canTransition(from: JobStatus, to: JobStatus, role: Role) {
  if (role === Role.ADMIN) return true;
  return allowed[from].includes(to);
}
