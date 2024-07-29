import React from "react";
import "./cart.css";
import { useCart } from "./CartContext";

interface CartProps {
  onClose: () => void;
  isOpen: boolean;
}

const Cart: React.FC<CartProps> = ({ onClose, isOpen }) => {
  const { cartItems, removeItemFromCart, updateItemQuantity, total } =
    useCart();

  return (
    <div className={`cart ${isOpen ? "show" : "hide"}`}>
      <div className="cart-header">
        <h2 className="cart-title">Cart ({cartItems.length} items)</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="cart-items-container">
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.key} className="cart-item">
                <span className="item-name">{item.name}</span>
                <div className="item-details">
                  <div className="item-quantity-control">
                    <button
                      onClick={() =>
                        updateItemQuantity(item, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateItemQuantity(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="remove-button"
                    onClick={() => removeItemFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart-footer">
        <p className="cart-total">Total: ${total.toFixed(2)}</p>
        <button
          className="checkout-button"
          onClick={() => console.log("Checkout!")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
