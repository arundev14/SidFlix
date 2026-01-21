import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });

  res.json({ msg: "Signup success" });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
  res.json({ token, user });
});

/* UPDATE PROFILE */
router.put("/profile", authMiddleware, async (req, res) => {
  const { name, password } = req.body;
  const updateData = { name };

  if (password && password.length >= 8) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Profile update failed" });
  }
});

export default router;
