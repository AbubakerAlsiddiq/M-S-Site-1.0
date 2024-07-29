import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faPhone,
  faEnvelope,
  faMapLocation,
  faMapLocationDot,
  faArrowRight,
  faCartShopping,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYelp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="box-container">
        <div className="box">
          <h3>
            Groco
            <i>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </i>
          </h3>
          <p>Follow Us On Social Media!</p>
          <div className="share">
            <a
              href="https://www.facebook.com/DelmarvaMediterraneanMarket/"
              title="facebook"
              className="links"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/delmarvamediterraneanmarket/"
              title="Instagram"
              className="links"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.tiktok.com/@your_username"
              title="TikTok"
              className="links"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a
              href="https://twitter.com/your_username"
              title="Twitter"
              className="links"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.yelp.com/biz/m-and-s-organics-salisbury"
              title="Yelp"
              className="links"
            >
              <FontAwesomeIcon icon={faYelp} />
            </a>
          </div>
        </div>

        <div className="box">
          <h3>Contact Info</h3>
          <a href="#" className="links" title="phoneNumber">
            <i>
              <FontAwesomeIcon icon={faPhone} />
            </i>
            410-341-7171
          </a>
          <a href="#" className="links" title="email">
            <i>
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
            aahmedgrow@gmail.com
          </a>
          <a href="#" className="links" title="mapMarker">
            <i>
              <FontAwesomeIcon icon={faMapLocationDot} />
            </i>
            Salisbury, MD, USA
          </a>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          <a href="#" className="links" title="Home">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            Home
          </a>
          <a href="#" className="links" title="Inventory">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            Inventory
          </a>
          <a href="#" className="links" title="About">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            About
          </a>
          <a href="#" className="links" title="Categories">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            Categories
          </a>
        </div>

        <div className="box">
          <h3>Newsletter</h3>
          <p>Subscribe For Latest Updates!</p>
          <input type="email" placeholder="Your Email" className="email" />
          <input type="submit" value="Subscribe" className="btn" />
          <img title="Payments" src="image/payment.png" />
        </div>
      </div>

      <div className="credit">
        Powered By <span>M&S Organics- Delmarva's Mediterranean Market</span> |
        All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
