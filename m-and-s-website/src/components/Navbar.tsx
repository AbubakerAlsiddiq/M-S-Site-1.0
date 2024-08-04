import React, { useState, useCallback, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/M_S_new_logo.png";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingBag,
  faMapMarker,
  faClock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { getTotalItemCount, total } = useCart();
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState<string[]>([
    "Mediterranean spices",
    "Organic olive oil",
    "Turkish delight",
    "Falafel mix",
  ]);
  const searchFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCancel = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/all-items?query=${encodeURIComponent(searchQuery)}`);
        setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
        setSearchQuery("");
        setIsSearchExpanded(false);
      }
    },
    [searchQuery, navigate, setRecentSearches]
  );

  const handleMenuToggle = React.useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    navigate(`/all-items?query=${encodeURIComponent(search)}`);
    setIsSearchExpanded(false);
  };

  const handleDeleteRecentSearch = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setRecentSearches((prevSearches) => {
      const updatedSearches = [...prevSearches];
      updatedSearches.splice(index, 1);
      return updatedSearches;
    });
  };

  return (
    <>
      <header className="sticky-header">
        <nav className="navbar">
          <div
            className={`navbar-container ${
              isSearchExpanded ? "search-expanded" : ""
            }`}
          >
            <div className="menu-and-brand">
              <button
                className="menu-btn"
                onClick={handleMenuToggle}
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <div className="navbar-logo-brand">
                <NavLink to="/" className="navbar-logo-brand">
                  <img src={Logo} alt="Logo" className="navbar-logo" />
                </NavLink>
                <div className="navbar-brand">
                  <span>Delmarva</span>
                  <span>Mediterranean</span>
                  <span>Market</span>
                </div>
              </div>
            </div>
            <div className="search-and-icons-container">
              <form
                ref={searchFormRef}
                onSubmit={handleSearch}
                className={`search-form ${isSearchExpanded ? "expanded" : ""}`}
              >
                <input
                  type="search"
                  id="search-box"
                  placeholder="Search M&S Organics"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                />
                <button type="submit" aria-label="Search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              {isSearchExpanded && (
                <button
                  type="button"
                  onClick={handleSearchCancel}
                  className="cancel-search"
                >
                  Cancel
                </button>
              )}
              <div className="navbar-icons">
                <button
                  className="cart-btn"
                  onClick={handleCartClick}
                  aria-label="Shopping cart"
                >
                  <FontAwesomeIcon icon={faShoppingBag} className="cart-icon" />
                  <span className="cart-item-count">{getTotalItemCount()}</span>
                  <span className="cart-total">${total.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
          <div className={`navbar-menu ${menuVisible ? "open" : ""}`}>
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
            <NavLink
              to="/about"
              className="nav-link"
              onClick={handleMenuToggle}
            >
              About us
            </NavLink>
          </div>
        </nav>
        {isSearchExpanded && (
          <div className="search-suggestions">
            {recentSearches.length > 0 && (
              <div className="recent-searches">
                <h3>Recent Searches</h3>
                <ul>
                  {recentSearches.map((search, index) => (
                    <li
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      <FontAwesomeIcon icon={faClock} className="recent-icon" />
                      <span>{search}</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="delete-icon"
                        onClick={(event) =>
                          handleDeleteRecentSearch(event, index)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="trending-searches">
              <h3>Trending Searches</h3>
              <ul>
                {trendingSearches.map((search, index) => (
                  <li key={index}>{search}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="white-line"></div>
        <div className="subheader">
          <div className="subheader-content">
            <p>
              <FontAwesomeIcon icon={faMapMarker} />
              1305 South division Street Suite 19 & 20, Salibsury MD
            </p>
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
            <NavLink
              to="/about"
              className="nav-link"
              onClick={handleMenuToggle}
            >
              About us
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
