import React from "react";
import Logo from "../assets/M&S New Logo.jpeg";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={Logo} alt="Logo" className="spinning-image" />
    </div>
  );
}

export default LoadingScreen;
