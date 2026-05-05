import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM admin_users WHERE username = ?", [username]);
        if (!rows.length) return res.status(401).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, rows[0].password_hash);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: rows[0].id, username }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, username });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;