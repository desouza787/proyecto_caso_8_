const express = require("express");
const app = express();
const stripe = require("stripe")("TU_SECRET_KEY_DE_STRIPE");

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const producto = req.body.producto;

  let item;
  if (producto === "detergente") {
    item = { price_data: { currency: "clp", product_data: { name: "Detergente Ecológico" }, unit_amount: 4990 * 100 }, quantity: 1 };
  } else {
    item = { price_data: { currency: "clp", product_data: { name: "Producto genérico" }, unit_amount: 1000 * 100 }, quantity: 1 };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [item],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
