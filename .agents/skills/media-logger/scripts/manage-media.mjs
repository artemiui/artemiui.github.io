import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../../../lib/media_database.json");

export function loadDatabase() {
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw);
}

export function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function sortDatabase(data) {
  return [...data].sort((a, b) => a.title.localeCompare(b.title));
}

export function validateEntry(entry) {
  const errors = [];
  if (!entry.title || !entry.title.trim()) errors.push("Missing title");
  if (!entry.type || !entry.type.trim()) errors.push("Missing type");
  if (entry.started && !/^\d{2}-\d{2}-\d{4}$/.test(entry.started) && !/^\d{4}-\d{2}-\d{2}$/.test(entry.started)) {
    errors.push(`Invalid started date format: ${entry.started}`);
  }
  if (entry.completed && !/^\d{2}-\d{2}-\d{4}$/.test(entry.completed) && !/^\d{4}-\d{2}-\d{2}$/.test(entry.completed)) {
    errors.push(`Invalid completed date format: ${entry.completed}`);
  }
  return errors;
}

export function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: "HEAD", headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, statusCode: res.statusCode });
      });
      req.on("error", () => resolve({ ok: false, statusCode: 0 }));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ ok: false, statusCode: 408 });
      });
      req.end();
    } catch {
      resolve({ ok: false, statusCode: 0 });
    }
  });
}

// CLI usage:
// node manage-media.mjs validate
// node manage-media.mjs sort
if (process.argv[1] === __filename) {
  const command = process.argv[2] || "validate";
  const data = loadDatabase();
  console.log(`Loaded ${data.length} entries from ${dbPath}`);

  if (command === "validate") {
    let hasError = false;
    data.forEach((entry, idx) => {
      const errs = validateEntry(entry);
      if (errs.length) {
        console.error(`Entry #${idx} (${entry.title}):`, errs);
        hasError = true;
      }
    });
    if (!hasError) {
      console.log("All entries passed schema validation!");
    }
  } else if (command === "sort") {
    const sorted = sortDatabase(data);
    saveDatabase(sorted);
    console.log("Database sorted alphabetically by title.");
  }
}
