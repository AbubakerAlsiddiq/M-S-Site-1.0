import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Category.css";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import itemImages from "./ItemImages";

interface Item {
  key: string;
  price: number;
  category: string;
  name: string;
  quantity: number;
}

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        if (!categoryName) {
          return;
        }
        console.log("Original categoryName:", categoryName);
        const encodedCategoryName = encodeURIComponent(categoryName);
        console.log("Encoded categoryName:", encodedCategoryName);

        const response = await fetch(
          `https://inventory.mandsorganics-delmarvamediterraneanmarket.com/api/inventory/${encodedCategoryName}`
        );
        const data: { [key: string]: number } = await response.json();
        const itemsArray: Item[] = Object.keys(data).map((itemName) => ({
          key: itemName,
          category: categoryName,
          name: itemName,
          price: data[itemName],
          quantity: 0,
        }));
        setItems(itemsArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching category items:", error);
        setError(
          `Failed to load items for category: ${categoryName}. ${error}`
        );
        setIsLoading(false);
      }
    };

    fetchCategoryItems();
  }, [categoryName]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="no-items">No items found in this category.</div>;
  }

  return (
    <div className="category-page-container">
      <div className="category-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </button>
        <h1>{categoryName}</h1>
      </div>
      <div className="items-container">
        {items.map((item) => (
          <div className="item" key={item.key}>
            <img
              src={itemImages[item.name] || "/path/to/default-image.jpg"}
              alt={item.name}
              className="item-image"
            />
            <h2>{item.name}</h2>
            <p className="item-price">${item.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() =>
                addItemToCart({
                  key: item.key,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                })
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
