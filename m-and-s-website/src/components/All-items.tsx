import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import "./all-items.css";
import Footer from "./Footer";
import itemImages from "./ItemImages";

interface Item {
  key: string;
  price: number;
  category: string;
  image: string;
}

const AllItems: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await fetch(
          "https://inventory.mandsorganics-delmarvamediterraneanmarket.com/api/inventory"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { [key: string]: { [key: string]: number } } =
          await response.json();

        const items: Item[] = Object.entries(data).flatMap(
          ([category, items]) =>
            Object.entries(items).map(([key, price]) => ({
              key,
              price,
              category,
              image: itemImages[key] || itemImages.Logo,
            }))
        );

        setAllItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError("Failed to load inventory. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (allItems.length === 0) {
    return <div className="no-items">No inventory items found.</div>;
  }

  return (
    <>
      <div className="all-items-page-container">
        <div className="all-items-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>All Items</h1>
        </div>
        <div className="all-items-container">
          {allItems.map((item) => (
            <div key={`${item.category}-${item.key}`} className="item">
              <img
                src={itemImages[item.key] || itemImages.Logo}
                alt={item.key}
                className="item-image"
              />
              <h2>{item.key}</h2>
              <p>Category: {item.category}</p>
              <p className="item-price">${item.price.toFixed(2)}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllItems;
