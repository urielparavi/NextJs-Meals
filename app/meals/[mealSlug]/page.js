import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// Dynamically generates metadata (like title and description) for a specific meal page
// based on the URL slug (params.mealSlug). This improves SEO and provides
// relevant metadata for each page. If the meal doesn't exist, a 404 page is returned.
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    // notFound() is a special function provided by Next.js (App Router).
    // 📌 It tells Next.js: "This page or resource doesn't exist."
    // 🧭 It stops rendering and shows the closest not-found.js page (like a 404).
    // ❌ It does NOT trigger error.js – it's NOT for unexpected crashes or bugs.
    // ✅ Use it when data is missing or the URL is invalid (e.g., no meal found).
    notFound();
  }

  // Replace all newline characters (\n) with <br/> tags
  // \n        = newline character
  // /\n/g     = regular expression to match ALL newline characters (g = global)
  // <br/>     = HTML line break tag to preserve formatting in the browser
  meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* 
      ⚠️ Using dangerouslySetInnerHTML:
      We're injecting raw HTML directly into the DOM.
      This is meant to be used when you receive a ready-made HTML template (like from a CMS, rich text editor, or Markdown converted to HTML) from a trusted source.
      Make sure the HTML comes from a trusted source — otherwise it can lead to XSS vulnerabilities.
      If the content comes from users or external sources, sanitize it first using a library like DOMPurify.
*/}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
