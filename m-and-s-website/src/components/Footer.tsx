import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYelp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const socialLinks = [
  {
    href: "https://www.facebook.com/DelmarvaMediterraneanMarket/",
    icon: faFacebook,
    title: "Facebook",
  },
  {
    href: "https://www.instagram.com/delmarvamediterraneanmarket/",
    icon: faInstagram,
    title: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@your_username",
    icon: faTiktok,
    title: "TikTok",
  },
  {
    href: "https://twitter.com/your_username",
    icon: faTwitter,
    title: "Twitter",
  },
  {
    href: "https://www.yelp.com/biz/m-and-s-organics-salisbury",
    icon: faYelp,
    title: "Yelp",
  },
];

const quickLinks = [
  { href: "/", text: "Home" },
  { href: "/inventory", text: "Inventory" },
  { href: "/about", text: "About Us" },
  { href: "/categories", text: "Categories" },
  { href: "/contact", text: "Contact" },
];

const contactInfo = [
  { icon: faPhone, text: "410-341-7171" },
  { icon: faEnvelope, text: "aahmedgrow@gmail.com" },
  { icon: faMapMarkerAlt, text: "Salisbury, MD, USA" },
  { icon: faClock, text: "Mon - Sun: 10:00 AM - 8:00 PM" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="footer-column">
              <h3 className="footer-logo">
                M&S Organics <FontAwesomeIcon icon={faShoppingBasket} />
              </h3>
              <p>
                Your one-stop shop for fresh, organic, and delicious groceries.
              </p>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    title={link.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      <FontAwesomeIcon icon={faChevronRight} /> {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={info.icon} />
                    <span>{info.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h4>Newsletter</h4>
              <p>Subscribe for exclusive offers and updates!</p>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} M&S Organics - Delmarva's
            Mediterranean Market. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
