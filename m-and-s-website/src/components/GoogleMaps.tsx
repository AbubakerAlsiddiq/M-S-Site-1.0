import React from "react";
import "./GoogleMaps.css";

function GoogleMaps() {
  return (
    <div className="google-maps-container">
      <div className="text-container">
        <h2>Visit us in store today!</h2>
        <p>1305 S Division St #19, Salisbury, MD 21804</p>
        <p>Directions available to you on the map to your right!</p>
        <p>Phone: 410-341-7171</p>
        <p>Come visit our store and check out our latest products!</p>
      </div>
      <div className="map-container">
        <iframe
          className="map"
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.448790049978!2d-75.60170222255465!3d38.33859347184913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b9040c9787b5b7%3A0x1162fa80886f7b22!2s1305%20S%20Division%20St%20%2319%2C%20Salisbury%2C%20MD%2021804!5e0!3m2!1sen!2sus!4v1719871687141!5m2!1sen!2sus"
        ></iframe>
      </div>
    </ div>
  );
}

export default GoogleMaps;
