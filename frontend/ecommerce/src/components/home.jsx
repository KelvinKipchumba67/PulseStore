import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/CartSlice';
import ProductCard from './productsCard';
import styles from './home.module.css'; // Import CSS Module

const HomeScreen = () => {
  const { incrementCartCount } = useOutletContext();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const products = useMemo(() => {
    const svgDataUrl = (label, accent = '#667eea') => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="${accent}" stop-opacity="0.30"/>
              <stop offset="1" stop-color="#ffffff" stop-opacity="0.95"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#g)"/>
          <rect x="60" y="70" width="680" height="460" rx="28" fill="#ffffff" fill-opacity="0.55"/>
          <text x="90" y="160" font-family="Arial, sans-serif" font-size="54" font-weight="800" fill="#111827">${label}</text>
          <text x="90" y="230" font-family="Arial, sans-serif" font-size="22" font-weight="600" fill="#6b7280">Placeholder product image</text>
        </svg>
      `;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    return [
      {
        _id: 'p1',
        name: 'Aurora Wireless Headphones',
        price: 129.99,
        image: svgDataUrl('Headphones'),
        rating: 4.6,
        badge: 'New',
        countInStock: 10,
      },
      {
        _id: 'p2',
        name: 'Nimbus Smartwatch Series 4',
        price: 179.0,
        image: svgDataUrl('Smartwatch', '#3b82f6'),
        rating: 4.3,
        badge: 'Sale',
        countInStock: 7,
      },
      {
        _id: 'p3',
        name: 'Lumen Desk Lamp (USB-C)',
        price: 39.5,
        image: svgDataUrl('Desk Lamp', '#22c55e'),
        rating: 4.1,
        badge: 'New',
        countInStock: 15,
      },
      {
        _id: 'p4',
        name: 'Voyager Travel Backpack 28L',
        price: 89.99,
        image: svgDataUrl('Backpack', '#f59e0b'),
        rating: 4.7,
        badge: 'Sale',
        countInStock: 5,
      },
      {
        _id: 'p5',
        name: 'Studio Mechanical Keyboard',
        price: 99.99,
        image: svgDataUrl('Keyboard', '#a855f7'),
        rating: 4.5,
        badge: 'New',
        countInStock: 12,
      },
      {
        _id: 'p6',
        name: 'Breeze Stainless Water Bottle',
        price: 24.99,
        image: svgDataUrl('Water Bottle', '#06b6d4'),
        rating: 4.0,
        badge: 'Sale',
        countInStock: 25,
      },
      {
        _id: 'p7',
        name: 'Orbit Portable Speaker',
        price: 59.99,
        image: svgDataUrl('Speaker', '#ef4444'),
        rating: 4.2,
        badge: 'New',
        countInStock: 9,
      },
      {
        _id: 'p8',
        name: 'CloudSoft Hoodie',
        price: 49.99,
        image: svgDataUrl('Hoodie', '#0ea5e9'),
        rating: 4.4,
        badge: 'Sale',
        countInStock: 11,
      },
    ];
  }, []);

  const addToCartFromHome = (product) => {
    const existing = cartItems?.find((x) => x._id === product._id);
    const nextQty = existing ? Math.min((existing.qty || 1) + 1, product.countInStock || 99) : 1;
    dispatch(addToCart({ ...product, qty: nextQty }));
    incrementCartCount();
  };

  const handleShopNow = () => {
    const section = document.getElementById('featured-products');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>New arrivals weekly</p>
          <h1 className={styles.heroTitle}>Shop smarter with modern essentials.</h1>
          <p className={styles.heroSubtitle}>
            Discover top picks curated for quality, comfort, and value — designed to convert browsers into buyers.
          </p>

          <div className={styles.ctaRow}>
            <button type="button" className={styles.primaryCta} onClick={handleShopNow}>
              Shop Now
            </button>
            <p className={styles.microcopy}>Fast checkout • Secure payments • Easy returns</p>
          </div>
        </div>

        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.heroImage} />
        </div>
      </section>

      {/* Products */}
      <div className={styles.sectionHeader} id="featured-products">
        <h2 className={styles.title}>Featured Products</h2>
        <p className={styles.sectionSubtitle}>A clean grid with high-intent interactions.</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={() => addToCartFromHome(product)}
            onQuickView={() => {
              // Minimal placeholder behavior (no modal per spec)
              window.alert(`${product.name}\n$${product.price}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;