import React from "react";
import "./Essentials.css";
import PitaBread from "../assets/PitaBread.jpeg";
import FetaCheese from "../assets/FetaCheese.jpeg";
import Hummus from "../assets/Hummus.jpg";
import Dates from "../assets/dates.jpeg";
import OliveOil from "../assets/OliveOil.jpeg";
import Baklava from "../assets/baklava.jpeg";
import Falafel from "../assets/falafel.jpeg";
import FavaBeans from "../assets/fava beans.jpeg";

interface Product {
  title: string;
  desc: string;
  image: string;
}

const products: Product[] = [
  {
    title: "Pita Bread",
    desc: "Soft, fluffy Mediterranean flatbread perfect for sandwiches and dips",
    image: PitaBread,
  },
  {
    title: "Olive Oil",
    desc: "Premium cold-pressed extra virgin olive oil from sun-drenched Mediterranean groves",
    image: OliveOil,
  },
  {
    title: "Feta Cheese",
    desc: "Creamy, tangy Greek feta cheese made from sheep's milk",
    image: FetaCheese,
  },
  {
    title: "Dates",
    desc: "Sweet, chewy Medjool dates packed with natural energy and nutrients",
    image: Dates,
  },
  {
    title: "Hummus",
    desc: "Smooth, creamy chickpea dip with tahini, lemon, and garlic",
    image: Hummus,
  },
  {
    title: "Baklava",
    desc: "Layers of flaky phyllo pastry filled with chopped nuts and sweet honey syrup",
    image: Baklava,
  },
  {
    title: "Falafel",
    desc: "Crispy, herb-infused chickpea fritters, a Middle Eastern vegetarian staple",
    image: Falafel,
  },
  {
    title: "Fava Beans",
    desc: "Protein-rich broad beans, a versatile ingredient in Mediterranean cuisine",
    image: FavaBeans,
  },
];

interface ProductCardProps {
  title: string;
  desc: string;
  image: string;
}

function ProductCard({ title, desc, image }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-desc">{desc}</p>
      </div>
    </div>
  );
}

function Essentials() {
  return (
    <div className="container">
      <h1 className="main-title">M&S Essentials</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Essentials;
