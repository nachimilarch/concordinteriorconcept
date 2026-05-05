import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM categories ORDER BY display_order ASC");
  res.json(rows);
});

router.post("/", protect, async (req, res) => {
  const { name, slug, icon, display_order } = req.body;
  const [result] = await pool.query(
    "INSERT INTO categories (name, slug, icon, display_order) VALUES (?,?,?,?)",
    [name, slug, icon, display_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put("/:id", protect, async (req, res) => {
  const { name, slug, icon, display_order } = req.body;
  await pool.query(
    "UPDATE categories SET name=?,slug=?,icon=?,display_order=? WHERE id=?",
    [name, slug, icon, display_order, req.params.id]
  );
  res.json({ message: "Updated" });
});

router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM categories WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
