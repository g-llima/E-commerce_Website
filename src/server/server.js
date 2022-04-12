require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const ProductModel = require("./Product.js");

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

mongoose
  .connect(process.env.REACT_APP_MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB database connection established successfully.");
  });

app.get("/products", async (req, res) => {
  const productsResult = await ProductModel.find({});
  res.send(JSON.stringify(productsResult));
});

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
              images: [item.imgUrl],
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
    res.status(500).json({ error: e.message });
  }
});

app.post("/payment/solo", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: req.body.name,
              images: [req.body.imgUrl],
            },
            unit_amount: req.body.price,
          },
          quantity: req.body.quantity,
        },
      ],
      success_url: `http://localhost:3000/sucess`,
      cancel_url: `http://localhost:3000`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => {
  console.log("Listening port 5000.");
});
