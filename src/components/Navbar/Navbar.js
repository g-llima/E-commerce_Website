import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useCart } from "react-use-cart";
import Scrollspy from "react-scrollspy";
import "./Navbar.css";

function covertProductPrice(value) {
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
}
function convertProductName(str) {
  if (str.length >= 41) {
    return str.substring(0, 41) + "...";
  }
  return str;
}

const navbarItems = [
  {
    name: "ITEM",
    link: "/",
  },
  {
    name: "ITEM",
    link: "/",
  },
  {
    name: "ITEM",
    link: "/",
  },
  {
    name: "ITEM",
    link: "/",
  },
];

function Navbar() {
  const [click, setClick] = useState(false);
  const [clickCart, setClickCart] = useState(false);
  const { items, cartTotal, isEmpty, updateItemQuantity, totalUniqueItems } =
    useCart();

  window.addEventListener("resize", () => setClick(false));

  function buy() {
    fetch("http://localhost:5000/payment", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        items: items.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.productName,
          };
        }),
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((error) => {
        console.log("Error ", error.error);
      });
  }

  return (
    <>
      <header className="navbar5">
        <nav className="navbar5__content">
          {/* NAVBAR LOGO */}
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
            {navbarItems.map((item, index) => (
              <Link key={index} to={item.link} onClick={() => setClick(!click)}>
                <li className="navbar5__content__items__item">{item.name}</li>
              </Link>
            ))}

            {/* CART ICON */}
            <button
              className="navbar5__content__items__cartBtn"
              onClick={() => setClickCart(!clickCart)}
            >
              <i className="far fa-shopping-cart navCartIcon"></i>

              {/* IF CART IS NOT EMPTY SHOW DOT WITH THE AMOUNT OF PRODUCTS ABOVE*/}
              {!isEmpty && (
                <div className="navbar5__content__items__cartBtn__quantity">
                  {totalUniqueItems}
                </div>
              )}
            </button>
          </Scrollspy>

          {/* HAMBURGUER MOBILE HEADER */}
          <div
            className="navbar5__content__mobileMenu"
            onClick={() => setClick(!click)}
          >
            <i className={`fas fa-${click ? "times" : "bars"}`}></i>
          </div>

          {/* SHOW PRODUCTS IN CART */}
          {!isEmpty && clickCart && (
            <div className="navbar5__content__cart">
              {items.map((item, index) => (
                <div
                  className="navbar5__content__mobileMenu__items"
                  key={index}
                >
                  {/* PRODUCT IMAGE */}
                  <img
                    className="navbar5__content__mobileMenu__items__img"
                    src={item.productImageLink}
                    alt={convertProductName(item.productName)}
                  />

                  {/* PRODUCT TEXTS */}
                  <div className="navbar5__content__mobileMenu__items__texts">
                    <h4 className="navbar5__content__mobileMenu__items__texts__name">
                      {convertProductName(item.productName)}
                    </h4>
                    <p className="navbar5__content__mobileMenu__items__texts__price">
                      R$ {covertProductPrice(item.price)}
                    </p>
                  </div>

                  {/* DECREASE OR INCREASE PRODUCT QUANTITY */}
                  <div className="navbar5__content__cart__inputs">
                    <button
                      className="navbar5__content__cart__inputs__btn"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <p className="navbar5__content__cart__inputs__quantity">
                      {item.quantity}
                    </p>
                    <button
                      className="navbar5__content__cart__inputs__btn"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* TOTAL PRICE */}
              <div className="navbar5__content__cart__total">
                <p>Total: </p>
                <p>R$ {covertProductPrice(cartTotal)}</p>
              </div>

              {/* BUY BUTTON */}
              <form method="post">
                <button
                  className="navbar5__content__cart__inputs__buyBtn"
                  type="button"
                  onClick={() => buy()}
                >
                  Buy now
                </button>
              </form>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
