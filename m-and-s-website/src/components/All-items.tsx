import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import "./all-items.css";
import Footer from "./Footer";
import Logo from "../assets/M_S_new_logo.png";
import itemImages from "./ItemImages";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck } from "@fortawesome/free-solid-svg-icons";

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
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

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

  const handleAddToCart = (item: Item) => {
    addItemToCart({
      key: item.key,
      name: item.key,
      price: item.price,
      quantity: 1,
    });
    setAddedItems((prev) => ({ ...prev, [item.key]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.key]: false }));
    }, 2000);
  };

  const displayedItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter(
      (item) =>
        item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allItems, searchQuery]);

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
          <h1>
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Items"}
          </h1>
        </div>
        <div className="all-items-container">
          {displayedItems.map((item) => (
            <div key={`${item.category}-${item.key}`} className="item">
              <Link
                to={`/category/${item.category}/product/${item.key}`}
                className="item-link"
              >
                <div className="item-image-container">
                  <img
                    src={itemImages[item.key] || Logo}
                    alt={item.key}
                    className="item-image"
                  />
                </div>
                <h2>{item.key}</h2>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </Link>
              <button
                className={`add-to-cart-button ${
                  addedItems[item.key] ? "added" : ""
                }`}
                onClick={() => handleAddToCart(item)}
                aria-label={`Add ${item.key} to cart`}
              >
                {addedItems[item.key] ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} /> Added
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
        {searchQuery && displayedItems.length === 0 && (
          <p>No items found matching your search.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllItems;
