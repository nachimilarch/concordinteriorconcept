import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET all settings as key-value object
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM site_settings");
  const settings = rows.reduce((acc, row) => { acc[row.key] = row.value; return acc; }, {});
  res.json(settings);
});

// Upload a settings image (hero, og image, etc.)
router.post("/upload", protect, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

// Bulk update — PUT /api/settings with body { key: value, ... }
router.put("/", protect, async (req, res) => {
  const settings = req.body;
  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
      [key, String(value ?? ""), String(value ?? "")]
    );
  }
  res.json({ message: "Settings saved" });
});

// Single key update — PUT /api/settings/:key
router.put("/:key", protect, async (req, res) => {
  const { value } = req.body;
  await pool.query(
    "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
    [req.params.key, value, value]
  );
  res.json({ message: "Setting updated" });
});

// Legacy bulk — POST /api/settings/bulk
router.post("/bulk", protect, async (req, res) => {
  const settings = req.body;
  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
      [key, String(value ?? ""), String(value ?? "")]
    );
  }
  res.json({ message: "Settings saved" });
});

export default router;
