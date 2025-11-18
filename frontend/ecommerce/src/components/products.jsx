import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/productsCard';
import Loader from '../components/loader';
import Message from '../components/message';
import styles from './products.module.css'; // We'll create this CSS file next

const ProductsScreen = () => {
  // We can reuse the keyword logic from HomeScreen if we want,
  // but for now, we'll just fetch all products.
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery(keyword);

  return (
    <div>
      <h2 className={styles.title}>
        {keyword ? `Search Results for "${keyword}"` : 'All Products'}
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <Message>No products found.</Message>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsScreen;