import { shareMeal } from '@/lib/action';
import ImagePicker from '../image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '../meals-form-submit';

export default function ShareMealPage() {
  // ✅ This is a Server Action:
  // A server-side function that's triggered by a client-side event,
  // like a form submission or button click.
  //
  // 🔄 How it works:
  // - The user submits a form (in the browser)
  // - The browser sends the form data to the server using `action={serverAction}`
  // - Next.js executes this function on the server (because of 'use server')
  //
  // 🛠️ In this function you can:
  // - Save data to a database
  // - Upload files
  // - Send emails
  // - Return responses (like redirects)
  //
  // 💡 Why it's great:
  // - No need for `onSubmit`
  // - No need for `fetch` or API routes
  // - It's secure, simple, and fully server-powered
  // async function shareMeal(formData) {
  //   'use server';

  //   const meal = {
  //     title: formData.get('title'),
  //     summary: formData.get('summary'),
  //     instructions: formData.get('instructions'),
  //     image: formData.get('image'),
  //     creator: formData.get('name'),
  //     creator_email: formData.get('email'),
  //   };
  //   console.log(meal);
  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
