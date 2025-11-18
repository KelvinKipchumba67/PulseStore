import mongoose from 'mongoose';

// Define the schema for a single review (embedded in the Product schema)
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 }, // 1-5 stars
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User who wrote the review
    },
  },
  {
    timestamps: true,
  }
);

// Define the main Product schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the user (admin) who created the product
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // For clean, unique URLs
    },
    image: {
      type: String,
      required: true, // URL to the product image
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema], // Array of embedded reviews
    rating: {
      type: Number,
      required: true,
      default: 0, // Calculated average rating
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0, // Total number of reviews
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;