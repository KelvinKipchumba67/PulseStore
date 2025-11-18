import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productsCard.module.css';

// We are removing the Rating component
// const Rating = ({ value, text }) => { ... };

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product._id}`}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
      </Link>

      <div className={styles.productInfo}>
        <Link to={`/product/${product._id}`}>
          <h3 className={styles.productName}>{product.name}</h3>
        </Link>

        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
        {/* The line above has been removed */}

        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;