import React from "react";

import Cards from "../components/Cards/Cards.js";
import Hero from "../components/Hero/Hero.jsx";
import Footer from "../components/Footer/Footer.jsx";

function HomePage() {
  return (
    <div>
      <Hero />
      <Cards />
      <Footer />
    </div>
  );
}

export default HomePage;
