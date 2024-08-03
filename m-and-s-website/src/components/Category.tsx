import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Category.css";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faShoppingCart,
  faSpinner,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/M_S_new_logo.png";
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
  const [page, setPage] = useState(1);
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const fetchCategoryItems = useCallback(async () => {
    try {
      if (!categoryName) {
        return;
      }
      const encodedCategoryName = encodeURIComponent(categoryName);
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
      setError(`Failed to load items for category: ${categoryName}. ${error}`);
      setIsLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchCategoryItems();
  }, [fetchCategoryItems]);

  const handleAddToCart = (item: Item) => {
    addItemToCart({
      key: item.key,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    setAddedItems((prev) => ({ ...prev, [item.key]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.key]: false }));
    }, 2000);
  };

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchCategoryItems}>Retry</button>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="no-items">No items found in this category.</div>;
  }

  if (!categoryName) {
    return <div>Error: Category name is missing</div>;
  }

  const displayedItems = items.slice(0, page * itemsPerPage);

  return (
    <div className="category-page-container">
      <div className="category-header">
        <button title="Back" onClick={() => navigate(-1)} aria-label="Go back">
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </button>
        <h1>{categoryName}</h1>
      </div>
      <div className="items-container">
        {displayedItems.map((item) => (
          <div className="item" key={item.key}>
            <Link
              to={`/category/${encodeURIComponent(
                categoryName || ""
              )}/product/${encodeURIComponent(item.name)}`}
              className="item-link"
            >
              <div className="item-image-container">
                <img
                  src={itemImages[item.name] || Logo}
                  alt={item.name}
                  className="item-image"
                  loading="lazy"
                />
              </div>
              <h2>{item.name}</h2>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </Link>
            <button
              className={`add-to-cart-button ${
                addedItems[item.key] ? "added" : ""
              }`}
              onClick={() => handleAddToCart(item)}
              aria-label={`Add ${item.name} to cart`}
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
      {items.length > page * itemsPerPage && (
        <button className="load-more-button" onClick={loadMoreItems}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Category;

export default Category;
