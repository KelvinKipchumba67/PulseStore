import React from 'react';
import styles from './home.module.css'; // Import CSS Module

const HomeScreen = () => {
  return (
    <div>
      <h1 className={styles.title}>Featured Products</h1>

      {/* Hero Section (Placeholder) */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to E-Store</h2>
        <p>Browse our amazing collection of products.</p>
      </div>

      {/* Product Grid (Placeholder) */}
      <div className={styles.grid}>
        {/* We will map over products from the API here */}
        <div className={styles.productCard}>
          <div className={styles.productImage}></div>
          <h3 className={styles.productName}>Product Name</h3>
          <p className={styles.productPrice}>$99.99</p>
        </div>
        <div className={styles.productCard}>
          <div className={styles.productImage}></div>
          <h3 className={styles.productName}>Product Name</h3>
          <p className={styles.productPrice}>$90.99</p>
        </div>
        <div className={styles.productCard}>
          <div className={styles.productImage}></div>
          <h3 className={styles.productName}>Product Name</h3>
          <p className={styles.productPrice}>$59.99</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;