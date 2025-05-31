import Link from 'next/link';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  // console.log('Fetching meals');

  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.height}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/*
        Suspense here handles async loading of the <Meals /> Server Component.

        Key differences:

        - Server (Next.js 13+): Suspense waits for async data fetching during server-side rendering, showing fallback until ready.
        
        - Client: Suspense is used mainly with React.lazy (code splitting) or with data-fetch libs like React Query. React doesn’t yet support native data fetching Suspense on the client.

        In short:  
        Server Suspense = waiting for async server data.  
        Client Suspense = waiting for lazy code or data via libs.
    */}
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
