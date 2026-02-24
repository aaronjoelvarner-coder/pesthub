import Stripe from 'stripe';
import { prisma } from './prisma';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', { apiVersion: '2024-06-20' });

export async function logIntegration(provider: 'STRIPE' | 'TWILIO' | 'QBO', status: 'SUCCESS' | 'ERROR', message: string, entityId?: string) {
  await prisma.integrationStatus.create({ data: { provider, status, message, entityId } });
}

export async function sendSms(to: string, body: string, companyId = 'default') {
  await prisma.notification.create({ data: { channel: 'SMS', recipient: to, content: body, companyId, status: 'QUEUED' } });
}

export async function syncQboInvoice(invoiceId: string) {
  try {
    await prisma.integrationStatus.create({ data: { provider: 'QBO', status: 'SUCCESS', entityId: invoiceId, message: 'Invoice sync placeholder succeeded' } });
  } catch {
    await prisma.integrationStatus.create({ data: { provider: 'QBO', status: 'ERROR', entityId: invoiceId, message: 'Invoice sync failed' } });
  }
}
