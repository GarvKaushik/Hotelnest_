import stripe from "stripe";
import Booking from "../models/bookings.js";
// API to Handle stripe webHooks

export const stripeWebHooks = async (request, response) => {
  // stripe gateaway
  const stripeinstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripeinstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    response.status(400).send(`webhook erre:${error.message}`);
  }
  // handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;
    // getting sesson data
    const session = await stripeinstance.checkout.sessions.list({
      payment_intent: paymentIntentId,
    });
    const { bookingId } = session.data[0].metadata;

    // mark payment as paid
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: "Stripe",
    });
  } else {
    console.log("UNhandled event type:", event.type);
  }
};
