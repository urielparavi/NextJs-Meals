'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

// @ Difference Between path === ... and path.startsWith(...) in Routing @

// path === '/products'
// Checks for an exact match. Only true if path is exactly '/products'.

// path.startsWith('/products')
// Checks if the path begins with '/products'.
// True for '/products', '/products/123', '/products/sale', etc.

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
