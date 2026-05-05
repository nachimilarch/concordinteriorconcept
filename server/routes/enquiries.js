import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message, service } = req.body;
  if (!name || !message) return res.status(400).json({ message: "Name and message required" });
  await pool.query(
    "INSERT INTO enquiries (name, email, phone, message, service) VALUES (?,?,?,?,?)",
    [name, email, phone, message, service]
  );
  res.status(201).json({ message: "Enquiry received. We'll be in touch soon!" });
});

router.get("/", protect, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY created_at DESC");
  res.json(rows);
});

router.put("/:id/read", protect, async (req, res) => {
  await pool.query("UPDATE enquiries SET read_status=1 WHERE id=?", [req.params.id]);
  res.json({ message: "Marked as read" });
});

router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM enquiries WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
