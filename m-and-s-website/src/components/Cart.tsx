import React from "react";
import "./CartPage.css";
import { useCart } from "./CartContext";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import itemImages from "./ItemImages";

const CartPage: React.FC = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, total } =
    useCart();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-column">
            <h1>Cart</h1>
            <p className="cart-subtotal">
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): $
              {total.toFixed(2)}
            </p>
            {cartItems.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              <>
                <h2 className="pickup-header">Order pickup</h2>
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li key={item.key} className="cart-item">
                      <div className="item-image">
                        <img
                          src={
                            itemImages[item.name] ||
                            "/path/to/default-image.jpg"
                          }
                          alt={item.name}
                        />
                      </div>
                      <div className="item-details">
                        <div className="item-name-price">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="item-actions">
                          <div className="item-quantity-control">
                            <label
                              htmlFor={`quantity-${item.key}`}
                              className="visually-hidden"
                            >
                              Quantity
                            </label>
                            <select
                              id={`quantity-${item.key}`}
                              value={item.quantity}
                              onChange={(e) =>
                                updateItemQuantity(
                                  item,
                                  parseInt(e.target.value)
                                )
                              }
                              aria-label={`Quantity for ${item.name}`}
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            className="remove-button"
                            onClick={() => removeItemFromCart(item)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="order-summary-column">
            <h1>Order summary</h1>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated tax</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total">
                <span>Estimated total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-button">Continue to checkout</button>
              <div className="payment-options">
                In Store Payment, Online payment Coming soon!
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
