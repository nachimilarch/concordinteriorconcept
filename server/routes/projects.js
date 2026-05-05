import express from "express";
import pool from "../models/db.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import slugify from "slugify";

const router = express.Router();

// PUBLIC: Get all published projects (with optional category filter)
router.get("/", async (req, res) => {
    const { category, featured, limit = 20, offset = 0 } = req.query;
    let sql = `SELECT p.*, c.name as category_name, c.slug as category_slug
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

// PUBLIC: Get single project by slug
router.get("/:slug", async (req, res) => {
    const [[project]] = await pool.query(
        `SELECT p.*, c.name as category_name FROM projects p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ? AND p.status = 'published'`,
        [req.params.slug]
    );
    if (!project) return res.status(404).json({ message: "Not found" });

    const [images] = await pool.query(
        "SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order",
        [project.id]
    );
    res.json({ ...project, images });
});

// ADMIN: Create project
router.post("/", protect, upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
    { name: "before_image", maxCount: 1 },
    { name: "after_image", maxCount: 1 },
]), async (req, res) => {
    const { title, category_id, location, area, year_completed,
        short_desc, full_desc, status, featured } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const cover = req.files?.cover_image?.[0]?.filename || null;

    const [result] = await pool.query(
        `INSERT INTO projects (title, slug, category_id, location, area, year_completed,
     short_desc, full_desc, cover_image, status, featured) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [title, slug, category_id, location, area, year_completed,
            short_desc, full_desc, cover, status || "draft", featured ? 1 : 0]
    );
    const projectId = result.insertId;

    // Insert gallery images
    const galleryFiles = req.files?.gallery || [];
    for (let i = 0; i < galleryFiles.length; i++) {
        await pool.query(
            "INSERT INTO project_images (project_id, image_path, sort_order) VALUES (?,?,?)",
            [projectId, galleryFiles[i].filename, i]
        );
    }
    // Before/After
    if (req.files?.before_image?.[0])
        await pool.query("INSERT INTO project_images (project_id, image_path, is_before) VALUES (?,?,1)",
            [projectId, req.files.before_image[0].filename]);
    if (req.files?.after_image?.[0])
        await pool.query("INSERT INTO project_images (project_id, image_path, is_after) VALUES (?,?,1)",
            [projectId, req.files.after_image[0].filename]);

    res.status(201).json({ message: "Project created", id: projectId, slug });
});

// ADMIN: Update project
router.put("/:id", protect, upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
]), async (req, res) => {
    const { title, category_id, location, area, year_completed,
        short_desc, full_desc, status, featured } = req.body;
    const cover = req.files?.cover_image?.[0]?.filename;
    const setCover = cover ? ", cover_image = ?" : "";
    const params = [title, category_id, location, area, year_completed,
        short_desc, full_desc, status, featured ? 1 : 0];
    if (cover) params.push(cover);
    params.push(req.params.id);

    await pool.query(
        `UPDATE projects SET title=?,category_id=?,location=?,area=?,year_completed=?,
     short_desc=?,full_desc=?,status=?,featured=?${setCover} WHERE id=?`, params
    );
    res.json({ message: "Updated" });
});

// ADMIN: Delete project
router.delete("/:id", protect, async (req, res) => {
    await pool.query("DELETE FROM projects WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
});

export default router;