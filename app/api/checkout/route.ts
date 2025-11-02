import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const PRICE_ID_GOLDEN_PEARL_ONLINE = process.env.PRICE_ID_GOLDEN_PEARL_ONLINE || 'price_123_online';
const PRICE_ID_GOLDEN_PEARL_INPERSON = process.env.PRICE_ID_GOLDEN_PEARL_INPERSON || 'price_123_inperson';

export async function POST(req: NextRequest) {
  try {
    const { product, variant, customer, metadata } = await req.json();

    if (product !== 'golden-pearl') {
      return NextResponse.json({ error: 'Unsupported product' }, { status: 400 });
    }

    const price =
      variant === 'inperson' ? PRICE_ID_GOLDEN_PEARL_INPERSON : PRICE_ID_GOLDEN_PEARL_ONLINE;

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    // Ensure Stripe is configured and instantiate lazily to avoid build-time failures
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey as string, {});

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customer?.email,
      success_url: `${origin}/events/golden-pearl/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/golden-pearl?canceled=1`,
      line_items: [{ price, quantity: 1 }],
      metadata: {
        event: 'golden-pearl',
        variant,
        name: customer?.name || '',
        mode: metadata?.mode || '',
        note: metadata?.note || '',
      },
    });

    return NextResponse.json({ url: session.url });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 });
  }
}
