'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // 🧠 useFormStatus is a special React hook from 'react-dom'
  // that gives us the current status of the surrounding <form>.
  //
  // ✅ Requirements:
  // - Must be used inside a **Client Component** (`'use client'` required at the top)
  // - That component must be **nested within a <form>**
  // - The <form> must use the `action={serverAction}` pattern (e.g. a Next.js Server Action)
  //
  // ✅ When the form is being submitted, `pending` will be true.
  // ❌ If the form is not using a Server Action or the hook is used outside the form,
  //     `pending` will always be false.
  //
  // 💡 This hook makes it easy to show a loading state (like "Submitting...")
  //     without manually managing state or writing event handlers.
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submiting...' : 'Share Meal'}
    </button>
  );
}
