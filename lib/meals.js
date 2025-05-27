import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // Simulate a delay of 2 seconds to mimic real-world latency (e.g. DB or API)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error('Loading meals failed');

  // .run() is used for write operations that modify the database:
  // INSERT (add), UPDATE (edit), DELETE (remove).
  // It executes the SQL command and returns metadata (e.g., lastInsertRowid, changes).

  // .all() is used for read operations (SELECT).
  // It executes a SELECT query and returns all matching rows as an array of objects.

  // .get() → Use for read operations that return a single row (SELECT).
  // Returns the first matching row as an object.

  // Fetch all rows from the 'meals' table after the delay
  // .all() returns an array of all matching records
  return db.prepare('SELECT * FROM meals').all();
}

// ⚠️ Using a parameterized (prepared) SQL statement:
// The `?` is a placeholder for the value of `slug`. It helps safely insert user input into the SQL query.
// This protects against SQL Injection by ensuring the value is treated as data, not executable SQL code.
// Always use placeholders instead of string interpolation when inserting variables into SQL queries!
export function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
