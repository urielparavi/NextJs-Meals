// 'use client';

// import { shareMeal } from '@/lib/action';
// import ImagePicker from '../image-picker';
// import classes from './page.module.css';
// import MealsFormSubmit from '../meals-form-submit';
// import { useActionState } from 'react';

// export default function ShareMealPage() {
//   // useActionState takes a Server Action function (here: shareMeal) and returns an array with:
//   // 1. state - an object representing the current status of the action (e.g., error or success messages)
//   // 2. formAction - a function that handles the form submission and automatically calls the server
//   //
//   // The initial state value is { message: null }, meaning no messages at the start.
//   //
//   // How it works:
//   // - The user submits the form connected to formAction
//   // - The data is sent to the Server Action (shareMeal) on the server side
//   // - The Server Action either returns an object with an error message or performs a redirect if successful
//   // - If a message is returned (e.g., an error), the state updates and the message is shown to the user
//   // - If a redirect happens, the browser navigates to a new page and state is not updated
//   //
//   // In short, useActionState simplifies managing form submissions and server feedback,
//   // allowing easy handling of error or success messages without writing onSubmit handlers or manual fetch calls.
//   const [state, formAction] = useActionState(shareMeal, { message: null });

//   // ✅ This is a Server Action:
//   // A server-side function that's triggered by a client-side event,
//   // like a form submission or button click.
//   //
//   // 🔄 How it works:
//   // - The user submits a form (in the browser)
//   // - The browser sends the form data to the server using `action={serverAction}`
//   // - Next.js executes this function on the server (because of 'use server')
//   //
//   // 🛠️ In this function you can:
//   // - Save data to a database
//   // - Upload files
//   // - Send emails
//   // - Return responses (like redirects)
//   //
//   // 💡 Why it's great:
//   // - No need for `onSubmit`
//   // - No need for `fetch` or API routes
//   // - It's secure, simple, and fully server-powered
//   // async function shareMeal(formData) {
//   //   'use server';

//   //   const meal = {
//   //     title: formData.get('title'),
//   //     summary: formData.get('summary'),
//   //     instructions: formData.get('instructions'),
//   //     image: formData.get('image'),
//   //     creator: formData.get('name'),
//   //     creator_email: formData.get('email'),
//   //   };
//   //   console.log(meal);
//   // }

//   return (
//     <>
//       <header className={classes.header}>
//         <h1>
//           Share your <span className={classes.highlight}>favorite meal</span>
//         </h1>
//         <p>Or any other meal you feel needs sharing!</p>
//       </header>
//       <main className={classes.main}>
//         <form className={classes.form} action={formAction}>
//           <div className={classes.row}>
//             <p>
//               <label htmlFor="name">Your name</label>
//               <input type="text" id="name" name="name" required />
//             </p>
//             <p>
//               <label htmlFor="email">Your email</label>
//               <input type="email" id="email" name="email" required />
//             </p>
//           </div>
//           <p>
//             <label htmlFor="title">Title</label>
//             <input type="text" id="title" name="title" required />
//           </p>
//           <p>
//             <label htmlFor="summary">Short Summary</label>
//             <input type="text" id="summary" name="summary" required />
//           </p>
//           <p>
//             <label htmlFor="instructions">Instructions</label>
//             <textarea
//               id="instructions"
//               name="instructions"
//               rows="10"
//               required
//             ></textarea>
//           </p>
//           <ImagePicker label="Your image" name="image" />
//           {state.message && <p>{state.message}</p>}
//           <p className={classes.actions}>
//             <MealsFormSubmit />
//           </p>
//         </form>
//       </main>
//     </>
//   );
// }

'use client';

import { shareMeal } from '@/lib/actions';
import ImagePicker from '../image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '../meals-form-submit';
import { useActionState } from 'react';

export default function ShareMealPage() {
  // useActionState takes a Server Action function (here: shareMeal) and returns an array with:
  // 1. state - an object representing the current status of the action (e.g., error or success messages)
  // 2. formAction - a function that handles the form submission and automatically calls the server
  //
  // The initial state value is { message: null }, meaning no messages at the start.
  //
  // How it works:
  // - The user submits the form connected to formAction
  // - The data is sent to the Server Action (shareMeal) on the server side
  // - The Server Action either returns an object with an error message or performs a redirect if successful
  // - If a message is returned (e.g., an error), the state updates and the message is shown to the user
  // - If a redirect happens, the browser navigates to a new page and state is not updated
  //
  // In short, useActionState simplifies managing form submissions and server feedback,
  // allowing easy handling of error or success messages without writing onSubmit handlers or manual fetch calls.
  const [state, formAction] = useActionState(shareMeal, { message: null });

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
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
              {state.field === 'name' && (
                <p className={classes.error}>{state.message}</p>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
              {state.field === 'email' && (
                <p className={classes.error}>{state.message}</p>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
            {state.field === 'title' && (
              <p className={classes.error}>{state.message}</p>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
            {state.field === 'summary' && (
              <p className={classes.error}>{state.message}</p>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
            {state.field === 'instructions' && (
              <p className={classes.error}>{state.message}</p>
            )}
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.field === 'image' && (
            <p className={classes.error}>{state.message}</p>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
