/**
 * Updates contact settings: new phone, two-location address.
 * Run: node seeds/updateContactSettings2.js
 */
import pool from "../models/db.js";

const SETTINGS = {
  company_phone:    "+91 98492 66375",
  company_address:  "Pragati Nagar, Hyderabad, Telangana",
  company_address_2: "Tirupati, Andhra Pradesh",
  // whatsapp_number stays as 919392484660 — unchanged
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
