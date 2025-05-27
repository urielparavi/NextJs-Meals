import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2>Community Perks</h2>

        <ul className={classes.perks}>
          <li>
            {/* 
 
            Using a regular <img> tag requires a valid src attribute:
            - src must contain the image URL or relative path.
            - Use <img src={image.src} /> when no Next.js optimizations are needed.
            - Common for external or simple static images.
        */}

            {/* ✅ Next.js <Image> component:
            Automatically optimizes images for performance.
            Benefits include:
            - Lazy loading by default
            - Responsive resizing for different screen sizes
            - Modern formats (like WebP) for better compression
            - SEO improvements (with proper alt text)
            - Better performance than regular <img> in production
        */}
            <Image src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}
