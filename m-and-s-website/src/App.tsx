import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";
import Inventory from "./components/Inventory";
import Category from "./components/Category";
import { CartProvider } from "./components/CartContext";
import Reviews from "./components/Reviews";
import Search from "./components/Search";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <CartProvider>
      <div className="App">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </CartProvider>
  );
}

export default App;
