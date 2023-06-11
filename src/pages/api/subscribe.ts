import { stripe } from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { priceId, customerId } = req.body;

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(200).json({ subscriptionId: subscription.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

