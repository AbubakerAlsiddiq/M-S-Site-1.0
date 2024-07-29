import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Essentials from "./Essentials";
import GoogleMaps from "./GoogleMaps";
import "./HomePage.css";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "./Footer";
import CountryFlag from "react-country-flag";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const monthlySpecial = {
    name: "",
    description: "",
    discount: "",
  };

  const mediterraneanCountries = [
    { name: "Greece", code: "GR" },
    { name: "Italy", code: "IT" },
    { name: "Spain", code: "ES" },
    { name: "Turkey", code: "TR" },
    { name: "Lebanon", code: "LB" },
    { name: "Morocco", code: "MA" },
    { name: "Egypt", code: "EG" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="Main">
        <Essentials />

        <div className="content-wrapper">
          <div className="column">
            <section className="monthly-special">
              <h2>This Month's Special</h2>
              <div className="special-card">
                <h3>{monthlySpecial.name}</h3>
                <p>{monthlySpecial.description}</p>
                <span className="discount">{monthlySpecial.discount}</span>
              </div>
            </section>

            <section className="recipe-of-the-week">
              <h2>Recipe of the Week: </h2>
              <div className="recipe-content">
                <p></p>
                <Link to="/recipe" className="view-recipe-btn">
                  View Recipe
                </Link>
              </div>
            </section>
          </div>

          <div className="column">
            <section className="we-offer-from">
              <h2>We Offer Products From</h2>
              <div className="country-flags">
                {mediterraneanCountries.map((country) => (
                  <div key={country.name} className="country-flag-container">
                    <CountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        width: "3em",
                        height: "3em",
                      }}
                      title={country.name}
                    />
                    <span className="country-name">{country.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="community-events">
              <h2>Upcoming Community Events</h2>
              <ul>
                <li>July 15: </li>
                <li>July 22: </li>
                <li>July 29: </li>
              </ul>
              <Link to="/events" className="view-all-events-btn">
                View All Events
              </Link>
            </section>
          </div>
        </div>

        <div className="space" />
        <GoogleMaps />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
