import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import slugify from "slugify";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.*, COUNT(p.id) AS project_count
    FROM categories c
    LEFT JOIN projects p ON p.category_id = c.id AND p.status = 'published'
    GROUP BY c.id
    ORDER BY c.display_order ASC
  `);
  res.json(rows);
});

router.post("/", protect, async (req, res) => {
  const { name, icon, display_order } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const [result] = await pool.query(
    "INSERT INTO categories (name, slug, icon, display_order) VALUES (?,?,?,?)",
    [name, slug, icon, display_order || 0]
  );
  res.status(201).json({ id: result.insertId, slug });
});

// Must be before /:id to avoid route collision
router.put("/reorder", protect, async (req, res) => {
  const { order } = req.body; // [{ id, display_order }]
  for (const item of order) {
    await pool.query("UPDATE categories SET display_order=? WHERE id=?", [item.display_order, item.id]);
  }
  res.json({ message: "Reordered" });
});

router.put("/:id", protect, async (req, res) => {
  const { name, icon, display_order } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
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
