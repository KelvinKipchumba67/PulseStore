import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productsCard.module.css';

// We are removing the Rating component
// const Rating = ({ value, text }) => { ... };

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const id = product?._id || product?.id;
  const image = product?.image;
  const badge = product?.badge;
  const ratingValue = Number(product?.rating ?? 0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const Star = ({ filled }) => (
    <svg
      className={styles.star}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 17.3 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  const EyeIcon = () => (
    <svg
      className={styles.quickIcon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <Link to={`/product/${id}`} className={styles.cardLink}>
      <article className={styles.productCard}>
        <div
          className={styles.productImage}
          style={image ? { backgroundImage: `url(${image})` } : undefined}
          aria-label={product?.name}
        >
          {badge ? <span className={styles.badge}>{badge}</span> : null}

          <div className={styles.hoverActions}>
            <button type="button" className={styles.addToCart} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              type="button"
              className={styles.quickView}
              onClick={handleQuickView}
              aria-label="Quick view"
              title="Quick view"
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product?.name}</h3>

          <div className={styles.ratingRow} aria-label={`Rating: ${ratingValue} out of 5`}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Star key={index} filled={ratingValue >= index} />
            ))}
            <span className={styles.ratingValue}>{ratingValue.toFixed(1)}</span>
          </div>

          <p className={styles.productPrice}>${product?.price}</p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;