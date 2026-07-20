import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM services ORDER BY display_order ASC");
  res.json(rows);
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  const { title, description, icon, display_order } = req.body;
  const image = req.file?.filename || null;
  const [result] = await pool.query(
    "INSERT INTO services (title, description, icon, image, display_order) VALUES (?,?,?,?,?)",
    [title, description, icon, image, display_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

// Must be before /:id
router.put("/reorder", protect, async (req, res) => {
  const { order } = req.body; // [{ id, display_order }]
  for (const item of order) {
    await pool.query("UPDATE services SET display_order=? WHERE id=?", [item.display_order, item.id]);
  }
  res.json({ message: "Reordered" });
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  const { title, description, icon, display_order } = req.body;
  const image = req.file?.filename;
  const setImage = image ? ", image=?" : "";
  const params = [title, description, icon, display_order];
  if (image) params.push(image);
  params.push(req.params.id);
  await pool.query(
    `UPDATE services SET title=?,description=?,icon=?,display_order=?${setImage} WHERE id=?`,
    params
  );
  res.json({ message: "Updated" });
});

router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM services WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
