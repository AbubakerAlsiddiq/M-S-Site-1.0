import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import itemImages from "./ItemImages";
import Logo from "../assets/M_S_new_logo.png";
import "./Product.css";

interface ProductDetails {
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

const Product: React.FC = () => {
  const { productName, categoryName } = useParams<{
    productName: string;
    categoryName: string;
  }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!categoryName || !productName) return;
        const encodedCategoryName = encodeURIComponent(categoryName);
        const response = await fetch(
          `https://inventory.mandsorganics-delmarvamediterraneanmarket.com/api/inventory/${encodedCategoryName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categoryData: { [key: string]: number } = await response.json();

        const decodedProductName = decodeURIComponent(productName);
        const productPrice = categoryData[decodedProductName];

        if (productPrice === undefined) {
          setError("Product not found in the category.");
          setIsLoading(false);
          return;
        }

        setProduct({
          name: decodedProductName,
          price: productPrice,
          category: categoryName,
          description:
            "This is a high-quality product from our store. It offers great value and is perfect for your needs. Made with care and attention to detail.",
          rating: 5,
          reviews: 1,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(`Failed to load product details. ${error}`);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [categoryName, productName]);

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="star" />
      );
    }

    return stars;
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found.</div>;

  return (
    <div className="product-page">
      <div className="product-header">
        <button title="backbutton" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back to {product.category}
        </button>
      </div>
      <div className="product-content">
        <div className="product-image-container">
          <img
            src={itemImages[product.name] || Logo}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="product-rating">
            {renderRatingStars(product.rating)}
            <span className="rating-number">{product.rating}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            className="add-to-cart-button"
            onClick={() =>
              addItemToCart({
                key: product.name,
                name: product.name,
                price: product.price,
                quantity: quantity,
              })
            }
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
