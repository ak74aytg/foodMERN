const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/checkOut", async (req, res) => {
  try {
    const existingOrder = await Order.findOne({ email: req.body.email });
    // console.log(existingOrder);
    if (existingOrder) {
      existingOrder.orders.push(req.body.orders);
      await existingOrder.save();
    } else {
      await Order.create({
        email: req.body.email,
        orders: [req.body.orders],
      });
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ error });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const existingOrder = await Order.findOne({ email: req.body.email });
    if (!existingOrder) {
      return res.send({ error: "you have not place any order yet" });
    }

    console.log(existingOrder);
    res.send({ 'orders' : existingOrder.orders });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
