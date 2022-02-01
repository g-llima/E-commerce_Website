import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Scrollspy from "react-scrollspy";
import "./styles/Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  window.addEventListener("resize", () => setClick(false));
  return (
    <>
      <header className="navbar5">
        <nav className="navbar5__content">
          <Link to="/">
            <img
              src="https://dummyimage.com/150x60/000/fff.png"
              alt="BRAND LOGO"
              onClick={() => setClick(false)}
            />
          </Link>
          <Scrollspy
            items={[
              "section-1",
              "section-2",
              "section-3",
              "section-4",
              "section-5",
            ]}
            currentClassName="navbar5Active"
            className={`navbar5__content__items ${
              click ? "nav5MobileActive" : null
            }`}
          >
            <Link to="/" onClick={() => setClick(!click)}>
              <li className="navbar5__content__items__item">ITEM</li>
            </Link>
            <Link to="/" onClick={() => setClick(!click)}>
              <li className="navbar5__content__items__item">ITEM</li>
            </Link>
            <Link to="/" onClick={() => setClick(!click)}>
              <li className="navbar5__content__items__item">ITEM</li>
            </Link>
            <Link to="/" onClick={() => setClick(!click)}>
              <li className="navbar5__content__items__item">ITEM</li>
            </Link>
            <button className="navbar5__content__items__cartBtn">
              <i className="fas fa-cart-plus"></i>
              <div className="navbar5__content__items__cartBtn__quantity">
                10
              </div>
            </button>
          </Scrollspy>
          <div
            className="navbar5__content__mobileMenu"
            onClick={() => setClick(!click)}
          >
            <i className={`fas fa-${click ? "times" : "bars"}`}></i>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
