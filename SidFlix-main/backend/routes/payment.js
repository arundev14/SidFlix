import express from "express";
import Razorpay from "razorpay";
import User from "../models/User.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_S0CSpar6U93yWp",       // your Test Key ID
  key_secret: "YOUR_RAZORPAY_TEST_SECRET",  // your backend secret
});

// Create Razorpay order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = { amount: amount * 100, currency: "INR" }; // in paise
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Upgrade subscription
router.post("/upgrade", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { subscription: true, paymentId },
      { new: true }
    );

    res.json({ msg: "Subscription activated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
