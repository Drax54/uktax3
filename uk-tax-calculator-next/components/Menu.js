import React from 'react';
import Link from 'next/link';
import styles from '../styles/Menu.module.css'; // Use CSS module for styling

function Menu() {
  return (
    <header className={styles.header}>
      <div className={styles.menuContainer}>
        <div className={styles.logo}>
        <Link href="/">
            <img src="/tax.png" alt="Logo" />
          </Link>
        </div>
        <nav className={styles.menuNav}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/AboutUs">About Us</Link>
            </li>
            <li>
              <Link href="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Menu;
