import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // Simulate a delay of 2 seconds to mimic real-world latency (e.g. DB or API)
  await new Promise((resolve) => setTimeout(resolve, 2000));
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
