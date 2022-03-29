require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

console.log(process.env.REACT_APP_SOME_VARIABLE);

const storeItems = new Map([
  [1, { price: 10000, name: "Learn React today" }],
  [2, { price: 20000, name: "Learn CSS today" }],
]);

app.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price,
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
