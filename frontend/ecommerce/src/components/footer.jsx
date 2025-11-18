import React from 'react';
import styles from './footer.module.css'; // Import CSS Module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} E-Store. All Rights Reserved.</p>
        <p className={styles.subtext}>kelvinkipchumba</p>
      </div>
    </footer>
  );
};

export default Footer;