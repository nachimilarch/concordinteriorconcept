import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password, remember } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM admin_users WHERE username = ?", [username]);
    if (!rows.length) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const expiresIn = remember ? "30d" : "7d";
    const token = jwt.sign({ id: rows[0].id, username }, process.env.JWT_SECRET, { expiresIn });
    res.json({ token, username, expiresIn });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", protect, (req, res) => {
  res.json({ message: "Logged out" });
});

export default router;
