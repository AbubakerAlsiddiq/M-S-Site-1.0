import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import MandS from "../assets/Owners photo.jpg";
import "./About.css";
import Footer from "./Footer";

function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const teamMembers = [
    { name: "Mohamed", role: "Co-Founder", image: "." },
    { name: "Somia", role: "Co-Founder", image: "." },
    { name: "Rose", role: "Customer Service Manager", image: "." },
    { name: "Abubaker", role: "Inventory Specialist", image: "." },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About M&S Organics</h1>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-paragraph">
                M&S Organics, also known as Delmarva Mediterranean Market, is a
                small family-run business that has been thriving since 2010. The
                M & S stand for Mohamed and Somia, the dynamic duo behind the
                market.
              </p>
              <p className="about-paragraph">
                M&S opened the store with the primary goal of promoting
                healthier living through food & sharing a bit of their own &
                many other cultures with the community. We carry a variety of
                goods from organics to Mediterranean specialties and much more!
              </p>
              <p className="about-paragraph">
                We hope you enjoy our selection. Thank you for visiting & happy
                hunting!
              </p>
            </div>
            <div className="about-image-container">
              <img src={MandS} alt="M&S Owners" className="about-image" />
              <p className="about-image-caption">
                M & S on February 15, 2010 at the opening ceremony of the store
              </p>
            </div>
          </div>

          <h2 className="team-title">Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
