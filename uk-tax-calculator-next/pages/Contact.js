// pages/contact.js

import React from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import styles from '../styles/Contact.module.css'; // Import the CSS module for Contact page

function Contact() {
  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.heading}>Contact Us</h1>
        <p className={styles.paragraph}>
          If you have any questions or feedback, feel free to reach out to us!
        </p>
        <p className={styles.paragraph}>
          Email: support@taxcalculator.com
        </p>
        <p className={styles.paragraph}>
          Phone: +44 123 456 7890
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
