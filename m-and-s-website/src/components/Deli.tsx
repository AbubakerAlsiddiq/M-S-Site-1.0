import React, { useEffect, useRef } from "react";
import {
  MenuItem,
  MenuCategory,
  MenuItems,
  categories,
  menuItems,
} from "./MenuData";
import "./Deli.css";

function Deli() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navLinks =
      document.querySelectorAll<HTMLAnchorElement>(".deli-nav a");
    const sections = document.querySelectorAll<HTMLElement>(".menu-section");

    const changeActiveLink = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach((link) => link.classList.remove("active"));
          navLinks[index]?.classList.add("active");
        }
      });
    };

    const handleNavClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement)
        .getAttribute("href")
        ?.slice(1);
      const targetSection = document.getElementById(targetId || "");
      const navHeight = navRef.current?.offsetHeight || 0;

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - navHeight - navHeight,
          behavior: "smooth",
        });
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    changeActiveLink();
    window.addEventListener("scroll", changeActiveLink);

    return () => {
      window.removeEventListener("scroll", changeActiveLink);
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
    };
  }, []);

  return (
    <div className="deli-container">
      <h1 className="deli-title">Delmarva's Delicious Deli</h1>

      <nav className="deli-nav" ref={navRef}>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <a href={`#${category.toLowerCase()}`}>{category}</a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category, index) => (
        <section
          key={index}
          id={category.toLowerCase()}
          className="menu-section"
        >
          <h2>{category}</h2>
          <div className="items-grid">
            {menuItems[category].map((item, itemIndex) => (
              <div key={itemIndex} className="menu-item">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price}</p>
                <p className="item-description">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Deli;
