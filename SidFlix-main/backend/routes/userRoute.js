import express from "express";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.put("/profile", auth, async (req, res) => {
  try {
    const { name, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, profilePic },
      { new: true }
    );

    res.json(user);
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
});

export default router;
