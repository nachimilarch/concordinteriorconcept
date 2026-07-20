import bcrypt from "bcryptjs";
import pool from "../models/db.js";

const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };

const username = getArg("--username") || "admin";
const password = getArg("--password");

if (!password) {
  console.error("Usage: node seeds/createAdmin.js --username admin --password yourpassword");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
await pool.query(
  "INSERT INTO admin_users (username, password_hash) VALUES (?,?) ON DUPLICATE KEY UPDATE password_hash=?",
  [username, hash, hash]
);
console.log(`✅ Admin user "${username}" created/updated successfully.`);
process.exit(0);
