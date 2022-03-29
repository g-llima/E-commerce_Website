import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useCart } from "react-use-cart";
import Scrollspy from "react-scrollspy";
import "./styles/Navbar.css";

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

function Navbar() {
  const [click, setClick] = useState(false);
  const [clickCart, setClickCart] = useState(false);
  const { items, cartTotal, isEmpty, updateItemQuantity, totalUniqueItems } =
    useCart();

  window.addEventListener("resize", () => setClick(false));

  console.log(items);

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
            <button
              className="navbar5__content__items__cartBtn"
              onClick={() => setClickCart(!clickCart)}
            >
              <i className="far fa-shopping-cart navCartIcon"></i>
              {!isEmpty && (
                <div className="navbar5__content__items__cartBtn__quantity">
                  {totalUniqueItems}
                </div>
              )}
            </button>
          </Scrollspy>
          <div
            className="navbar5__content__mobileMenu"
            onClick={() => setClick(!click)}
          >
            <i className={`fas fa-${click ? "times" : "bars"}`}></i>
          </div>

          {!isEmpty && clickCart && (
            <div className="navbar5__content__cart">
              {items.map((item, index) => (
                <div
                  className="navbar5__content__mobileMenu__items"
                  key={index}
                >
                  <img
                    className="navbar5__content__mobileMenu__items__img"
                    src={item.productImageLink}
                    alt={convertProductName(item.productName)}
                  />
                  <div className="navbar5__content__mobileMenu__items__texts">
                    <h4 className="navbar5__content__mobileMenu__items__texts__name">
                      {convertProductName(item.productName)}
                    </h4>
                    <p className="navbar5__content__mobileMenu__items__texts__price">
                      $ {covertProductPrice(item.price)}
                    </p>
                  </div>

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
              <div className="navbar5__content__cart__total">
                <p>Total: </p>
                <p>$ {covertProductPrice(cartTotal)}</p>
              </div>
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
