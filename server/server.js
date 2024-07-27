const express = require("express");
const app = express();
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Pfy6hL4BOjqsWjmh3mOTajNk9L0cMGLDrJYyG6xwMzl6XKyO5lxoUFI38RkAD7zmunohQCBsH9e7x76lD74sNql00ZoPjBfK1"
);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "hkd",
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
