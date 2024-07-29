import React, { createContext, useState, useContext } from "react";

interface CartItem {
  key: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  updateItemQuantity: (item: CartItem, newQuantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.key === item.key);
      if (existingItem) {
        return prevItems.map((i) =>
          i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const removeItemFromCart = (item: CartItem) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.key !== item.key));
    setTotal((prevTotal) => prevTotal - item.price * item.quantity);
  };

  const updateItemQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromCart(item);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.key === item.key ? { ...i, quantity: newQuantity } : i
        )
      );
      setTotal(
        (prevTotal) =>
          prevTotal - item.price * item.quantity + item.price * newQuantity
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
