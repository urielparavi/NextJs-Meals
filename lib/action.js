// 'use server';

// import { redirect } from 'next/navigation';
// import { saveMeal } from './meals';

// function isInvalidText(text) {
//   return !text || text.trim() === '';
// }

// export async function shareMeal(prevState, formData) {
//   const meal = {
//     title: formData.get('title'),
//     summary: formData.get('summary'),
//     instructions: formData.get('instructions'),
//     image: formData.get('image'),
//     creator: formData.get('name'),
//     creator_email: formData.get('email'),
//   };

//   // Validate each required field using isInvalidText helper for empty or whitespace-only values
//   if (isInvalidText(meal.title)) {
//     return { message: 'Please enter a valid title.' }; // Title is missing or invalid
//   }
//   if (isInvalidText(meal.summary)) {
//     return { message: 'Please provide a short summary.' }; // Summary is missing or invalid
//   }
//   if (isInvalidText(meal.instructions)) {
//     return { message: 'Please add cooking instructions.' }; // Instructions are missing or invalid
//   }
//   if (isInvalidText(meal.creator)) {
//     return { message: 'Please enter your name.' }; // Creator's name is missing or invalid
//   }
//   // For email, also check if it contains '@' to ensure basic validity
//   if (isInvalidText(meal.creator_email) || !meal.creator_email.includes('@')) {
//     return { message: 'Please enter a valid email address.' }; // Email is missing, invalid, or malformed
//   }
//   // Check if an image file was uploaded and has size greater than zero
//   if (!meal.image || meal.image.size === 0) {
//     return { message: 'Please upload an image.' }; // No image uploaded or file is empty
//   }

//   await saveMeal(meal);
//   redirect('/meals');
// }

'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // Validate each required field using isInvalidText helper for empty or whitespace-only values
  if (isInvalidText(meal.title)) {
    return { field: 'title', message: 'Please enter a valid title.' }; // Title is missing or invalid
  }
  if (isInvalidText(meal.summary)) {
    return { field: 'summary', message: 'Please provide a short summary.' }; // Summary is missing or invalid
  }
  if (isInvalidText(meal.instructions)) {
    return {
      field: 'instructions',
      message: 'Please add cooking instructions.',
    }; // Instructions are missing or invalid
  }
  if (isInvalidText(meal.creator)) {
    return { field: 'name', message: 'Please enter your name.' }; // Creator's name is missing or invalid
  }
  // For email, also check if it contains '@' to ensure basic validity
  if (isInvalidText(meal.creator_email) || !meal.creator_email.includes('@')) {
    return { field: 'email', message: 'Please enter a valid email address.' }; // Email is missing, invalid, or malformed
  }
  // Check if an image file was uploaded and has size greater than zero
  if (!meal.image || meal.image.size === 0) {
    return { field: 'image', message: 'Please upload an image.' }; // No image uploaded or file is empty
  }

  await saveMeal(meal);
  redirect('/meals');
}
