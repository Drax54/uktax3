// components/Footer.js

import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; // Use CSS module for styling

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left column: About */}
        <div className={styles.footerAbout}>
          <h3>About Us</h3>
          <p>
            This is a simple tax calculator app that helps you estimate your take-home income based on your gross salary. It is designed to provide a clear understanding of the tax breakdown for the UK tax system.<br/><br/>
            Website is designed by Rahul Patel.
          </p>
        </div>
        
        {/* Right column: Menu items */}
        <div className={styles.footerMenu}>
          <ul>
            <li>
              <Link href="/">Home</Link> {/* Removed <a> */}
            </li>
            <li>
              <Link href="/about-us">About Us</Link> {/* Removed <a> */}
            </li>
            <li>
              <Link href="/contact">Contact</Link> {/* Removed <a> */}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
