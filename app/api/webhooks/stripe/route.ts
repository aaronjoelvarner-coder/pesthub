import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe, logIntegration } from '@/lib/integrations';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') || '';
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test');
  } catch {
    return NextResponse.json({ error: 'bad signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const invoiceId = session.metadata?.invoiceId;
    if (invoiceId) {
      await prisma.invoice.update({ where: { id: invoiceId }, data: { status: 'PAID', payments: { create: { amountCents: session.amount_total || 0, provider: 'STRIPE', externalId: session.id } } } });
      await logIntegration('STRIPE', 'SUCCESS', 'Payment received', invoiceId);
      await prisma.integrationStatus.create({ data: { provider: 'QBO', status: 'SUCCESS', entityId: invoiceId, message: 'Payment sync placeholder success' } });
    }
  }
  return NextResponse.json({ received: true });
}
