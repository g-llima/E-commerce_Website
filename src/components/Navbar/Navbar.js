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
  const [openNav, setopenNav] = useState(false);
  const [clickCart, setClickCart] = useState(true);
  const { items, cartTotal, isEmpty, updateItemQuantity, totalUniqueItems } =
    useCart();

  window.addEventListener("resize", () => setopenNav(false));

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

  console.log(items);

  return (
    <>
      <header className="navbar5">
        <div className="navbar5__cart">
          <div className="navbar5__cart__header">
            <h3>SEU CARRINHO</h3>
            <i className="fa-solid fa-xmark navbar5__cart__header__icon"></i>
          </div>

          <div className="navbar5__cart__products">
            {items.map((item, index) => (
              <div className="navbar5__cart__products__container" key={index}>
                <div className="navbar5__cart__products__imgWrapper">
                  <img
                    src={item.productImageLink}
                    alt={convertProductName(item.productName)}
                  />
                </div>

                <div className="navbar5__cart__products__texts">
                  <p>{convertProductName(item.productName)}</p>
                  <div className="navbar5__cart__products__texts__bottom">
                    <p>Qnt: {item.quantity}</p>
                    <p className="navbar5__cart__products__texts__bottom__price">
                      R$ {covertProductPrice(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="navbar5__cart__footer">
            <button onClick={() => buy()}>COMPRAR</button>
          </div>
        </div>

        <nav className="navbar5__content">
          {/* NAVBAR LOGO */}
          <Link to="/" onClick={() => setopenNav(false)}>
            <h1 className="navbar5__content__logo">
              <span>ENG</span>COM
            </h1>
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
              openNav ? "nav5MobileActive" : null
            }`}
          >
            {/* HEADER ITEMS */}
            {navbarItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => setopenNav(!openNav)}
                className="navbar5__content__items__item"
              >
                <li>{item.name}</li>
              </Link>
            ))}
          </Scrollspy>

          {/* CART ICON */}

          <button
            className="navbar5__content__items__cartBtn"
            onClick={() => {
              setClickCart(!clickCart);
              setopenNav(false);
            }}
          >
            <i className="fa-solid fa-cart-shopping navCartIcon"></i>

            {/* IF CART IS NOT EMPTY SHOW DOT WITH THE AMOUNT OF PRODUCTS ABOVE*/}
            {!isEmpty && (
              <div className="navbar5__content__items__cartBtn__quantity">
                {totalUniqueItems}
              </div>
            )}
          </button>

          {/* HAMBURGUER MOBILE HEADER */}
          <div
            className="navbar5__content__mobileMenu"
            onClick={() => setopenNav(!openNav)}
          >
            <i className={`fas fa-${openNav ? "times" : "bars"}`}></i>
          </div>

          {/* SHOW PRODUCTS IN CART
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
                      R$ {covertProductPrice(item.price)}
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
                <p>R$ {covertProductPrice(cartTotal)}</p>
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
          )} */}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
