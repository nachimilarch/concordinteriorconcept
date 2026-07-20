import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC: Submit enquiry
router.post("/", async (req, res) => {
  const { name, email, phone, message, service } = req.body;
  if (!name || !message) return res.status(400).json({ message: "Name and message required" });
  await pool.query(
    "INSERT INTO enquiries (name, email, phone, message, service) VALUES (?,?,?,?,?)",
    [name, email, phone, message, service]
  );
  res.status(201).json({ message: "Enquiry received. We'll be in touch soon!" });
});

// ADMIN: Export CSV — must be defined before /:id
router.get("/export/csv", protect, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY created_at DESC");
  const header = "ID,Name,Email,Phone,Service,Message,Date,Status\n";
  const csv = rows.map(r =>
    [
      r.id,
      `"${(r.name || "").replace(/"/g, '""')}"`,
      `"${(r.email || "").replace(/"/g, '""')}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.service || "").replace(/"/g, '""')}"`,
      `"${(r.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${r.created_at}"`,
      r.read_status ? "Read" : "Unread",
    ].join(",")
  ).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="enquiries-${Date.now()}.csv"`);
  res.send(header + csv);
});

// ADMIN: List enquiries with optional status filter
router.get("/", protect, async (req, res) => {
  const { status } = req.query;
  let sql = "SELECT * FROM enquiries WHERE 1=1";
  const params = [];
  if (status === "read") { sql += " AND read_status = 1"; }
  if (status === "unread") { sql += " AND read_status = 0"; }
  sql += " ORDER BY created_at DESC";
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

// ADMIN: Get single enquiry
router.get("/:id", protect, async (req, res) => {
  const [[row]] = await pool.query("SELECT * FROM enquiries WHERE id=?", [req.params.id]);
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

// ADMIN: Mark as read
router.put("/:id/read", protect, async (req, res) => {
  await pool.query("UPDATE enquiries SET read_status=1 WHERE id=?", [req.params.id]);
  res.json({ message: "Marked as read" });
});

// ADMIN: Mark as unread
router.put("/:id/unread", protect, async (req, res) => {
  await pool.query("UPDATE enquiries SET read_status=0 WHERE id=?", [req.params.id]);
  res.json({ message: "Marked as unread" });
});

// ADMIN: Delete
router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM enquiries WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
