'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

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
  // Revalidate only the /meals page (triggers a rebuild of that specific route)
  revalidatePath('/meals');

  // Revalidate the entire site (root layout and all nested routes will be revalidated)
  // Use this if your data update affects multiple pages across the app
  // revalidatePath('/', 'layout');

  // Revalidate all pages nested under /meals (e.g., /meals/[id])
  // Useful when your data change affects multiple child routes under a specific parent
  // revalidatePath('/meals', 'layout');
  redirect('/meals');
}
