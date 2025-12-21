import React from 'react';
import styles from './footer.module.css'; // Import CSS Module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Customer Service</h3>
          <a className={styles.link} href="#">
            Shipping & Returns
          </a>
          <a className={styles.link} href="#">
            Track Order
          </a>
          <a className={styles.link} href="#">
            FAQs
          </a>
          <a className={styles.link} href="#">
            Contact Support
          </a>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Socials</h3>
          <div className={styles.socialLinks}>
            <a className={styles.socialLink} href="#" aria-label="Twitter" title="Twitter">
              X
            </a>
            <a className={styles.socialLink} href="#" aria-label="Instagram" title="Instagram">
              IG
            </a>
            <a className={styles.socialLink} href="#" aria-label="Facebook" title="Facebook">
              FB
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Newsletter</h3>
          <p className={styles.newsletterText}>
            Get product drops, deals, and updates.
          </p>
          <form
            className={styles.newsletterForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className={styles.newsletterInput}
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <button className={styles.newsletterButton} type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} E-Store. All Rights Reserved.
          </p>
          <p className={styles.copyright}>kelvinkipchumba</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;