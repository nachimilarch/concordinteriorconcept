import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import slugify from "slugify";

const router = express.Router();

// ── ADMIN: Get all projects with filters ────────────────────────────────────
router.get("/admin/all", protect, async (req, res) => {
  const { category, status, featured, search, page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let where = "WHERE 1=1";
  const params = [];
  if (category) { where += " AND c.slug = ?"; params.push(category); }
  if (status && status !== "all") { where += " AND p.status = ?"; params.push(status); }
  if (featured === "1") { where += " AND p.featured = 1"; }
  if (search) { where += " AND p.title LIKE ?"; params.push(`%${search}%`); }

  const baseSql = `FROM projects p LEFT JOIN categories c ON p.category_id = c.id ${where}`;
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total ${baseSql}`, params);

  const [projects] = await pool.query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug ${baseSql} ORDER BY p.updated_at DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), offset]
  );
  res.json({ projects, total, page: Number(page), limit: Number(limit) });
});

// ── ADMIN: Get single project by ID ─────────────────────────────────────────
router.get("/admin/:id", protect, async (req, res) => {
  const [[project]] = await pool.query(
    `SELECT p.*, c.name AS category_name FROM projects p
     LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?`,
    [req.params.id]
  );
  if (!project) return res.status(404).json({ message: "Not found" });
  const [images] = await pool.query(
    "SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order",
    [project.id]
  );
  res.json({ ...project, images });
});

// ── ADMIN: Delete single gallery image ──────────────────────────────────────
router.delete("/images/:imageId", protect, async (req, res) => {
  await pool.query("DELETE FROM project_images WHERE id = ?", [req.params.imageId]);
  res.json({ message: "Image deleted" });
});

// ── ADMIN: Reorder gallery images ───────────────────────────────────────────
router.put("/images/reorder", protect, async (req, res) => {
  const { order } = req.body; // [{ id, sort_order }]
  for (const item of order) {
    await pool.query("UPDATE project_images SET sort_order = ? WHERE id = ?", [item.sort_order, item.id]);
  }
  res.json({ message: "Reordered" });
});

// ── PUBLIC: Project stats ────────────────────────────────────────────────────
router.get("/stats", async (req, res) => {
  const [[{ totalProjects }]] = await pool.query(
    "SELECT COUNT(*) AS totalProjects FROM projects WHERE status = 'published'"
  );
  const [settings] = await pool.query(
    "SELECT `key`, `value` FROM site_settings WHERE `key` IN ('founding_year','years_experience','happy_clients','awards_won')"
  );
  const s = settings.reduce((acc, r) => { acc[r.key] = r.value; return acc; }, {});
  const currentYear = new Date().getFullYear();
  const foundingYear = parseInt(s.founding_year) || (currentYear - 12);
  const yearsExperience = parseInt(s.years_experience) || (currentYear - foundingYear);
  res.json({
    totalProjects,
    yearsExperience,
    happyClients: parseInt(s.happy_clients) || 120,
    awardsWon: parseInt(s.awards_won) || 8,
  });
});

// ── PUBLIC: Get all published projects ──────────────────────────────────────
router.get("/", async (req, res) => {
  const { category, featured, limit = 20, offset = 0 } = req.query;
  let sql = `SELECT p.*, c.name AS category_name, c.slug AS category_slug
             FROM projects p LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.status = 'published'`;
  const params = [];
  if (category) { sql += " AND c.slug = ?"; params.push(category); }
  if (featured) { sql += " AND p.featured = 1"; }
  sql += " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

// ── PUBLIC: Get single project by slug ──────────────────────────────────────
router.get("/:slug", async (req, res) => {
  const [[project]] = await pool.query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug FROM projects p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ? AND p.status = 'published'`,
    [req.params.slug]
  );
  if (!project) return res.status(404).json({ message: "Not found" });
  const [images] = await pool.query(
    "SELECT * FROM project_images WHERE project_id = ? AND is_before = 0 AND is_after = 0 ORDER BY sort_order",
    [project.id]
  );
  const [[beforeImg]] = await pool.query(
    "SELECT * FROM project_images WHERE project_id = ? AND is_before = 1 LIMIT 1", [project.id]
  );
  const [[afterImg]] = await pool.query(
    "SELECT * FROM project_images WHERE project_id = ? AND is_after = 1 LIMIT 1", [project.id]
  );
  res.json({ ...project, images, beforeImg: beforeImg || null, afterImg: afterImg || null });
});

// ── ADMIN: Create project ───────────────────────────────────────────────────
router.post("/", protect, upload.fields([
  { name: "cover_image", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "before_image", maxCount: 1 },
  { name: "after_image", maxCount: 1 },
]), async (req, res) => {
  const { title, category_id, location, area, year_completed, short_desc, full_desc, status, featured } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const cover = req.files?.cover_image?.[0]?.filename || null;

  const [result] = await pool.query(
    `INSERT INTO projects (title, slug, category_id, location, area, year_completed, short_desc, full_desc, cover_image, status, featured)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [title, slug, category_id || null, location, area, year_completed, short_desc, full_desc, cover, status || "draft", featured ? 1 : 0]
  );
  const projectId = result.insertId;

  const galleryFiles = req.files?.gallery || [];
  for (let i = 0; i < galleryFiles.length; i++) {
    await pool.query(
      "INSERT INTO project_images (project_id, image_path, sort_order) VALUES (?,?,?)",
      [projectId, galleryFiles[i].filename, i]
    );
  }
  if (req.files?.before_image?.[0])
    await pool.query("INSERT INTO project_images (project_id, image_path, is_before) VALUES (?,?,1)",
      [projectId, req.files.before_image[0].filename]);
  if (req.files?.after_image?.[0])
    await pool.query("INSERT INTO project_images (project_id, image_path, is_after) VALUES (?,?,1)",
      [projectId, req.files.after_image[0].filename]);

  res.status(201).json({ message: "Project created", id: projectId, slug });
});

// ── ADMIN: Update project ───────────────────────────────────────────────────
router.put("/:id", protect, upload.fields([
  { name: "cover_image", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "before_image", maxCount: 1 },
  { name: "after_image", maxCount: 1 },
]), async (req, res) => {
  const { title, category_id, location, area, year_completed, short_desc, full_desc, status, featured, slug: customSlug } = req.body;
  const cover = req.files?.cover_image?.[0]?.filename;
  const setCover = cover ? ", cover_image = ?" : "";
  const slugVal = customSlug || slugify(title, { lower: true, strict: true });
  const params = [title, slugVal, category_id || null, location, area, year_completed, short_desc, full_desc, status, featured ? 1 : 0];
  if (cover) params.push(cover);
  params.push(req.params.id);

  await pool.query(
    `UPDATE projects SET title=?,slug=?,category_id=?,location=?,area=?,year_completed=?,short_desc=?,full_desc=?,status=?,featured=?${setCover} WHERE id=?`,
    params
  );

  const galleryFiles = req.files?.gallery || [];
  if (galleryFiles.length > 0) {
    const [[{ maxOrder }]] = await pool.query(
      "SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM project_images WHERE project_id = ? AND is_before=0 AND is_after=0",
      [req.params.id]
    );
    for (let i = 0; i < galleryFiles.length; i++) {
      await pool.query(
        "INSERT INTO project_images (project_id, image_path, sort_order) VALUES (?,?,?)",
        [req.params.id, galleryFiles[i].filename, maxOrder + 1 + i]
      );
    }
  }
  if (req.files?.before_image?.[0]) {
    await pool.query("DELETE FROM project_images WHERE project_id=? AND is_before=1", [req.params.id]);
    await pool.query("INSERT INTO project_images (project_id, image_path, is_before) VALUES (?,?,1)",
      [req.params.id, req.files.before_image[0].filename]);
  }
  if (req.files?.after_image?.[0]) {
    await pool.query("DELETE FROM project_images WHERE project_id=? AND is_after=1", [req.params.id]);
    await pool.query("INSERT INTO project_images (project_id, image_path, is_after) VALUES (?,?,1)",
      [req.params.id, req.files.after_image[0].filename]);
  }

  res.json({ message: "Updated" });
});

// ── ADMIN: Delete project ───────────────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  await pool.query("DELETE FROM projects WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
