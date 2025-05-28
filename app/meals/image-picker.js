'use client';
// This directive tells Next.js that this component must be rendered on the client side.
// Because we use React hooks like useRef and browser event handlers like onClick,
// which require access to the DOM and user interactions that only exist in the browser.
// Without 'use client', Next.js would try to render this component on the server,
// where there is no DOM or browser events, causing errors.

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

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

  function handleImageChange(event) {
    // 'files' is a FileList object, which behaves like an array containing all selected files.
    // Even if the user selects only one file, it is stored as the first item at index 0.
    // Therefore, we use [0] to access that first (or only) file inside the FileList.
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // If we make it past this if check, we know that some file has been selected

    // FileReader is a built-in Web API that lets you read file content selected by the user,
    // typically via an <input type="file" /> element.
    // This is necessary because, for security reasons, you can't directly access file contents.
    // Reading is asynchronous, so we use the 'onload' event to handle the result.
    const fileReader = new FileReader();

    // 'onload' is an event handler on the FileReader object.
    // It fires when the file reading operation is successfully completed.
    // At this point, 'fileReader.result' contains the read data (e.g., a base64 string if using readAsDataURL).
    fileReader.onload = () => {
      // Base64 is an encoding method that converts binary data (like files or images)
      // into a text string using only safe characters (letters, numbers, +, and /).
      // This allows binary data to be easily transmitted or stored in systems that handle text only,
      // such as emails, HTTP requests, or JSON.
      // Essentially, it turns binary into text so it can be safely used where raw binary isn't supported.

      // This event triggers when the file is fully read.
      // fileReader.result contains the file data as a base64-encoded data URL (because of readAsDataURL).
      // This data URL can be used directly as an <img> src to display the image.
      setPickedImage(fileReader.result);
      // @ fileReader.result @
      // 'result' is a built-in property of the FileReader object.
      // It holds the data read from the file after the reading operation completes.
      // You don't set 'result' yourself; it's automatically populated by FileReader.
    };
    // Starts reading the file's content and encodes it as a base64 Data URL.
    // This process is asynchronous, and once complete, triggers the 'onload' event.
    // The resulting Data URL can be accessed via fileReader.result inside the onload handler.
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA...
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
          // multiple <-- add this attribute to allow selecting multiple files
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
