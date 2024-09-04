// pages/about-us.js

import React from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css'; // Import the CSS module for About Us page

function AboutUs() {
  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.paragraph}>
          This is a simple tax calculator app that helps you calculate your take-home salary after taxes and National Insurance contributions.
        </p>
        <p className={styles.paragraph}>
          We aim to provide accurate and up-to-date tax information to help users understand their income and make informed financial decisions.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
