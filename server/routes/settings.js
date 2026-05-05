import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM site_settings");
  const settings = rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
  res.json(settings);
});

router.put("/:key", protect, async (req, res) => {
  const { value } = req.body;
  await pool.query(
    "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
    [req.params.key, value, value]
  );
  res.json({ message: "Setting updated" });
});

router.post("/bulk", protect, async (req, res) => {
  const settings = req.body;
  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
      [key, value, value]
    );
  }
  res.json({ message: "Settings saved" });
});

export default router;
