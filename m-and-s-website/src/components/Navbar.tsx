import React, { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/M_S_new_logo.png";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setShowSearchForm(false);
        setSearchQuery("");
      }
    },
    [searchQuery, navigate]
  );

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    }
  }, [cartItems]);

  const handleSearchClick = useCallback(() => {
    setShowSearchForm((prev) => !prev);
    setIsCartOpen(false);
  }, []);

  const handleCartToggle = useCallback(() => {
    setIsCartOpen((prev) => !prev);
    setShowSearchForm(false);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-brand">
          <img src={Logo} alt="Logo" className="navbar-logo" />
          <div className="navbar-brand">
            <span>Delmarva</span>
            <span>Mediterranean</span>
            <span>Market</span>
          </div>
        </div>
        <div className={`navbar-menu ${menuVisible ? "open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={handleMenuToggle}>
            Home
          </NavLink>
          <NavLink
            to="/Inventory"
            className="nav-link"
            onClick={handleMenuToggle}
          >
            Inventory
          </NavLink>
          <NavLink
            to="/reviews"
            className="nav-link"
            onClick={handleMenuToggle}
          >
            Reviews
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={handleMenuToggle}>
            About us
          </NavLink>
        </div>
        <div className="navbar-icons">
          <button
            className="menu-btn"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            className="search-btn"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="cart-btn"
            onClick={handleCartToggle}
            aria-label="Shopping cart"
          >
            <FontAwesomeIcon icon={faShoppingBag} />
          </button>
          <button className="user-btn" aria-label="User profile">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
      <Cart onClose={() => setIsCartOpen(false)} isOpen={isCartOpen} />
      <form
        onSubmit={handleSearch}
        className={`search-form ${showSearchForm ? "show" : "hide"}`}
      >
        <input
          type="search"
          id="search-box"
          placeholder="Search Inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
