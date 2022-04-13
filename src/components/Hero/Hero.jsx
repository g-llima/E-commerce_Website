import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__content">
        <div className="hero__content__texts">
          <h3 className="hero__content__texts__subtitle">
            Lorem ipsum dolor sit.
          </h3>
          <h1 className="hero__content__texts__title">Lorem ipsum dolor.</h1>
          <p className="hero__content__texts__text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur incidunt nobis excepturi, vel consectetur provident
            molestiae quam nihil. Accusantium, libero.
          </p>
          <button className="hero__content__texts__exploreBtn">
            Explorar!
          </button>
        </div>

        <div className="hero__content__imgWrapper">
          <img
            src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png"
            alt="ENGCOM"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
