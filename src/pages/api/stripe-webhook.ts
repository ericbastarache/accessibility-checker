import { stripe } from '../../lib/stripe';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const event = req.body;

    switch (event.type) {
      case 'invoice.paid':
        // Update your database, notify the user, etc.
        break;
      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method. 
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      // ... handle other event types
      default:
        // Unexpected event type
        return res.status(400).end();
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

