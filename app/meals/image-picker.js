'use client';
// This directive tells Next.js that this component must be rendered on the client side.
// Because we use React hooks like useRef and browser event handlers like onClick,
// which require access to the DOM and user interactions that only exist in the browser.
// Without 'use client', Next.js would try to render this component on the server,
// where there is no DOM or browser events, causing errors.

import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // useRef returns an object with a .current property
  // When used as ref on a DOM element, .current points to that element
  // This lets us access/manipulate the DOM directly without re-rendering

  // useRef holds a reference to the <input type="file"> DOM element
  // Changing imageInput.current does NOT trigger a re-render
  const imageInput = useRef();

  function handlePickClick() {
    // When clicking the button, we programmatically "click" the hidden file input
    // This opens the file picker dialog without rendering changes
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
