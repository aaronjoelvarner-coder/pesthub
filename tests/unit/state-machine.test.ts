import { describe, expect, it } from 'vitest';
import { canTransition } from '@/lib/state-machine';

describe('job status state machine', () => {
  it('allows linear transition for non-admin', () => {
    expect(canTransition('SCHEDULED' as any, 'EN_ROUTE' as any, 'TECH' as any)).toBe(true);
    expect(canTransition('SCHEDULED' as any, 'COMPLETED' as any, 'TECH' as any)).toBe(false);
  });
});
