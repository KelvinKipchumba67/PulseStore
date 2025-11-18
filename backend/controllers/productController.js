import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// --- Public Access Routes ---

/**
 * @desc    Fetch all products (with optional search/pagination/filtering later)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  // Simple implementation now, we will add search/pagination later (Task 4)
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc    Fetch single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // This triggers the 404 error handler in errorMiddleware
    res.status(404);
    throw new Error('Product not found');
  }
});

// --- Admin Access Routes (Protected by 'protect' and 'admin' middleware) ---

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  // Create a sample product with default data.
  // The Admin can then edit this with the update route.
  const product = new Product({
    name: 'Sample Product',
    slug: `sample-product-${Date.now()}`,
    price: 0,
    user: req.user._id, // The logged-in admin who created it
    image: 'https://placehold.co/600x400/000000/FFFFFF?text=Product+Image',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    slug,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Update the product fields
    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.slug = slug || product.slug; // Ensure slug remains unique if changed

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Mongoose 7 syntax for deleting a document
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};