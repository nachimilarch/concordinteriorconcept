import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { active } = req.query;
  let sql = "SELECT * FROM testimonials WHERE 1=1";
  const params = [];
  if (active === "1") { sql += " AND is_active = 1"; }
  sql += " ORDER BY display_order ASC";
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

router.post("/", protect, upload.single("photo"), async (req, res) => {
  const { client_name, designation, company, review_text, rating, display_order, is_active } = req.body;
  const photo = req.file?.filename || null;
  const [result] = await pool.query(
    `INSERT INTO testimonials (client_name, designation, company, review_text, rating, photo, display_order, is_active)
     VALUES (?,?,?,?,?,?,?,?)`,
    [client_name, designation, company, review_text, Number(rating) || 5, photo, Number(display_order) || 0, is_active === "0" ? 0 : 1]
  );
  res.status(201).json({ id: result.insertId });
});

router.put("/:id", protect, upload.single("photo"), async (req, res) => {
  const { client_name, designation, company, review_text, rating, display_order, is_active } = req.body;
  const photo = req.file?.filename;
  const setPhoto = photo ? ", photo=?" : "";
  const params = [client_name, designation, company, review_text, Number(rating) || 5, Number(display_order) || 0, is_active === "0" ? 0 : 1];
  if (photo) params.push(photo);
  params.push(req.params.id);
  await pool.query(
    `UPDATE testimonials SET client_name=?,designation=?,company=?,review_text=?,rating=?,display_order=?,is_active=?${setPhoto} WHERE id=?`,
    params
  );
  res.json({ message: "Updated" });
});

router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM testimonials WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
