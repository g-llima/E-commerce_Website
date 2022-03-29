require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

app.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "brl",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/sucess`,
      cancel_url: `http://localhost:3000`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ eror: e.message });
  }
});

app.listen(5000);
