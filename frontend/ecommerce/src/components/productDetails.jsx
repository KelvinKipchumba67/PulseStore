import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../store/slices/productsApiSlice';
import { addToCart } from '../store/slices/CartSlice';
import Loader from './loader';
import Message from './message';
import styles from './productDetails.module.css';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <div className={styles.page}>
      <Link to="/products" className={styles.backLink}>
        8 Back to Products
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className={styles.layout}>
          <div className={styles.media}>
            <img className={styles.image} src={product.image} alt={product.name} />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.metaRow}>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.rating}>
                Rating: {Number(product.rating || 0).toFixed(1)}
              </span>
            </div>

            {product.description ? (
              <p className={styles.description}>{product.description}</p>
            ) : null}

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={addToCartHandler}>
                Add to Cart
              </button>
              <Link to="/cart" className={styles.secondaryButton}>
                View Cart
              </Link>
            </div>

            {typeof product.countInStock === 'number' ? (
              <p className={styles.stock}>
                {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsScreen;
