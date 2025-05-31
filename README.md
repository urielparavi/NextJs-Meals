```jsx
// Simple React functional component example
// Use this snippet in your README.md to demonstrate a basic component structure

export default function Example() {
  return (
    <div>
      {/* Your content here */}
      {/* Your content h */}
    </div>
  );
}
```

## 📦 Using `better-sqlite3` with Node.js

[`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) is a fast and simple SQLite3 library for Node.js. It provides synchronous API access, making it ideal for small applications, desktop apps, local tools, and testing environments.

### 📥 Installation

```bash
npm install better-sqlite3

```

## 📦 Install Dependencies

We use the `slugify` package to generate URL-friendly slugs from meal titles.  
For example, a title like **"My Favorite Meal!"** becomes **"my-favorite-meal"**.  
This helps us create clean, readable, and unique URLs for each shared meal.

```bash
npm install slugify

```

## 🧪 Example Usage

```bash
import slugify from 'slugify';

const title = 'My Favorite Meal!';
const slug = slugify(title, { lower: true }); // -> 'my-favorite-meal'
```

## 🛡️ Sanitize User Input

We use the `xss` package to sanitize user input and protect against cross-site scripting (XSS) attacks.  
This ensures that any HTML or script tags submitted by users are cleaned before being stored or rendered.

```bash
npm install xss
```
