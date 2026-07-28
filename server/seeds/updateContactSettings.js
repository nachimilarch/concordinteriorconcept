/**
 * One-time script: set contact details from Canva portfolio last page.
 * Run: node seeds/updateContactSettings.js
 */
import pool from "../models/db.js";

const SETTINGS = {
  company_address:  "Pragati Nagar, Hyderabad, Telangana",
  company_phone:    "+91 93924 84660",
  company_phone_2:  "+91 62811 11638",
  company_email:    "info@concord-solutions.in",
  whatsapp_number:  "919392484660",
};

async function run() {
  for (const [key, value] of Object.entries(SETTINGS)) {
    await pool.query(
      "INSERT INTO site_settings (`key`, `value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
      [key, value, value]
    );
    console.log(`  ✓ ${key} = ${value}`);
  }
  console.log("\nDone.");
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
