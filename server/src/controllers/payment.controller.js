import Stripe from "stripe";

export const createCheckoutSession = async (req, res) => {
  try {
    // 🔒 create Stripe ONLY when function runs
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: "Stripe secret key missing"
      });
    }

    const { items } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ message: "Payment failed" });
  }
};
