import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

export async function saveMeal(meal) {
  // Generate a URL-friendly "slug" from the meal title (e.g. "My Tasty Meal" → "my-tasty-meal")
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize the instructions to prevent XSS attacks,
  // especially important because we render this content using dangerouslySetInnerHTML in [mealSlug].
  meal.instructions = xss(meal.instructions);

  // Extract the file extension from the image filename (e.g., "photo.png" → "png")
  // This is done by splitting the filename on the dot ('.') and using .pop() to get the last segment
  // name => because our image it's object with properties since we used the <Image/> component by next.js
  const extension = meal.image.name.split('.').pop();

  const timestamp = Date.now(); // Get the current timestamp in milliseconds since January 1, 1970

  // Construct a new filename by combining the slug and the original file extension
  // Example: "spicy-taco" + ".png" → "spicy-taco.png"
  // const filename = `${meal.slug}-${timestamp}.${extension}`;

  // Construct a unique filename by combining the slug, a timestamp, and the original file extension
  // This ensures that each file has a unique name to prevent overwriting or duplication
  // Example: "spicy-taco" + "-" + 1717098400000 + ".png" → "spicy-taco-1717098400000.png"
  const filename = `${meal.slug}-${timestamp}.${extension}`;

  // Creates a stream to write data to a file called `${filename}` in the `public/images` folder.
  // This lets us write the file little by little, which is good for big files
  // because it doesn't use a lot of memory all at once.
  const stream = fs.createWriteStream(`public/images/${filename}`);

  // Convert the image data (meal.image) into an ArrayBuffer,
  // which is a raw binary data buffer stored in memory.
  // This ArrayBuffer holds the image data temporarily as bytes before processing or saving.

  // Note on difference between Buffer and ArrayBuffer:
  // - ArrayBuffer is a generic, low-level container for binary data (used mostly in browsers).
  // - Buffer is a Node.js-specific, enhanced version of ArrayBuffer with helpful methods to work with binary data
  // (like reading, writing, slicing, converting to strings, etc.).
  // You often convert ArrayBuffer to Buffer when working in Node.js to easily manipulate or save data.
  const bufferedImage = await meal.image.arrayBuffer();

  await new Promise((resolve, reject) => {
    // Write the bufferedImage (converted to a Buffer) to the writable stream
    // Since this runs on the server side (Node.js) and not on the client,
    // we need to convert the ArrayBuffer to a Node.js Buffer
    // so that the stream.write() method can handle the binary data properly.ד
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        // If there is an error during writing, reject the promise with an error message
        reject(new Error('Saving image failed!'));
      } else {
        // If writing succeeds, resolve the promise to continue
        resolve();
      }
    });
    // End the writable stream, signaling that all data has been written
    stream.end();
  });
  // We're saving the relative path of the uploaded image to the database.
  // For example, if a user uploads "burger.jpg", we save:
  // meal.image = "/images/burger.jpg"
  //
  // Why not include "public" in the path?
  // In Next.js, the "public" folder acts as the virtual root of your domain.
  // That means any file inside "public" is accessible via a URL that starts at "/".
  //
  // Example:
  // On the server:    /public/images/burger.jpg
  // In the browser:   https://your-site.com/images/burger.jpg
  //
  // If you saved "public/images/burger.jpg" in the database,
  // the browser would try to fetch: https://your-site.com/public/images/burger.jpg
  // But that URL doesn’t exist — you'll get a 404 error.
  //
  // So we only store the relative URL that starts from the domain root:
  // ✅ Correct relative path — Next.js will serve it from the public folder
  meal.image = `/images/${filename}`;

  // We're inserting a new meal into the "meals" table using a prepared statement.
  // Each field (e.g. @title, @image) is a placeholder that will be filled in
  // with the actual values from the "meal" object.
  //
  // This technique is called a "Prepared Statement":
  // ✅ Security: It protects against SQL Injection attacks, because the values are
  //    passed separately from the SQL code. Even if a user tries to inject malicious SQL,
  //    it will be treated as plain text — not executable code.
  // ✅ Performance: The database can cache the query structure (its "plan") and reuse it,
  //    which is more efficient when running similar inserts multiple times.
  //
  // Why use @placeholders instead of string interpolation?
  // ❌ Dangerous example (DO NOT DO THIS):
  // db.exec(`INSERT INTO meals (title) VALUES ('${userInput}')`);
  // A user could inject code like: `'; DROP TABLE meals; --` and cause real damage.
  //
  // ✅ Safe example (this code):
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}
