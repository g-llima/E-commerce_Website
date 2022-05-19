require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const ProductModel = require("./src/server/Product.js");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

mongoose
  .connect(process.env.REACT_APP_MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB database connection established successfully.");
  });

app.get("https://engcom.herokuapp.com/products", async (req, res) => {
  const productsResult = await ProductModel.find({});
  res.send(JSON.stringify(productsResult));
});

app.post("https://engcom.herokuapp.com/payment", async (req, res) => {
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
      success_url: `https://legendary-piroshki-3b954e.netlify.app`,
      cancel_url: `https://legendary-piroshki-3b954e.netlify.app`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log("Listening port " + port + ".");
});
