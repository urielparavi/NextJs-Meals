'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval that runs every 5000 milliseconds (5 seconds)
    const interval = setInterval(() => {
      // Update the current image index
      // If it's not the last image, move to the next one
      // If it's the last image, start again from the first one (index 0)
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {/* Loop through the images array and render an <Image /> component for each one */}
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          // Apply the "active" CSS class only to the image whose index matches the currentImageIndex
          // This is typically used to control which image is visible or styled differently in the slideshow
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
