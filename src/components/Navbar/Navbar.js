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
  let productName = str.substring(0, str.indexOf("---"));

  if (productName.length >= 38) {
    return productName.substring(0, 38) + "...";
  }
  return productName;
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
  const [clickCart, setClickCart] = useState(false);
  const {
    items,
    cartTotal,
    isEmpty,
    updateItemQuantity,
    totalUniqueItems,
    removeItem,
  } = useCart();
  const [scrolled, setScrolled] = useState(false);

  window.addEventListener("resize", () => setopenNav(false));
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50 && scrolled === false) {
      setScrolled(true);
    }
    if (window.scrollY < 50 && scrolled === true) {
      setScrolled(false);
    }
  });

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
            name: item.productName.replace("---", ""),
            imgUrl: item.productImageLink,
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

  function getSize(item) {
    const productInput = item.productName.substring(
      item.productName.indexOf("---") + 3
    );
    return productInput.substring(0, productInput.indexOf("-"));
  }

  function getColor(item) {
    const productInput = item.productName.substring(
      item.productName.indexOf("---") + 3
    );
    return productInput.substring(productInput.indexOf("-") + 1);
  }

  return (
    <>
      <header className={`navbar5 ${scrolled && "navbar5__scrolled"}`}>
        {/* ----------------- CART ------------------- */}
        <div className={`navbar5__cart ${clickCart ? "activeCart" : null}`}>
          <div className="navbar5__cart__header">
            <h3>SEU CARRINHO</h3>
            <i
              className="fa-solid fa-xmark navbar5__cart__header__icon"
              onClick={() => setClickCart(false)}
            ></i>
          </div>

          {/* ----------------- CART PRODUCTS------------------- */}
          {isEmpty ? (
            <div className="navbar5__cart__empty">
              <h2>SEU CARRINHO ESTÁ VAZIO</h2>
              <p>🙁</p>
            </div>
          ) : (
            <div className="navbar5__cart__products">
              {items.map((item, index) => (
                <div className="navbar5__cart__products__container" key={index}>
                  {/* ----------------- CART PRODUCT IMAGE------------------- */}
                  <div className="navbar5__cart__products__imgWrapper">
                    <img
                      src={item.productImageLink}
                      alt={convertProductName(item.productName)}
                    />
                    <i
                      className="fa-solid fa-xmark navbar5__cart__products__imgWrapper__removeicon"
                      onClick={() => removeItem(item.id)}
                    ></i>
                  </div>

                  {/* ----------------- CART PRODUCT TEXT------------------- */}
                  <div className="navbar5__cart__products__texts">
                    <div className="navbar5__cart__products__texts__info">
                      <p>{convertProductName(item.productName)}</p>
                      <p className="navbar5__cart__products__texts__info__subinfo">
                        Cor: <span>{getColor(item)}</span>
                      </p>
                      <p className="navbar5__cart__products__texts__info__subinfo">
                        Tamanho: <span>{getSize(item)}</span>
                      </p>
                    </div>

                    {/* ----------------- CART PRODUCT QUANTITY------------------- */}
                    <div className="navbar5__cart__products__texts__quantityBtns">
                      <i
                        className="fa-solid fa-plus"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      ></i>
                      <i
                        className="fa-solid fa-minus"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      ></i>
                    </div>

                    {/* ----------------- CART PRODUCT PRICE & QUANTITY ------------------- */}
                    <div className="navbar5__cart__products__texts__bottom">
                      <p>Qnt: {item.quantity}</p>
                      <p className="navbar5__cart__products__texts__bottom__price">
                        R$ {covertProductPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* ----------------- CART PRODUCTS TOTAL------------------- */}
              <p className="navbar5__cart__products__valorTotal">
                Valor total: R$ {covertProductPrice(cartTotal)}
              </p>
            </div>
          )}

          {/* ----------------- CART PRODUCT BUY BUTTON------------------- */}
          {!isEmpty && (
            <div className="navbar5__cart__footer">
              <button onClick={() => buy()}>COMPRAR</button>
            </div>
          )}
        </div>

        <nav className={`navbar5__content`}>
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
            }}
          >
            <i
              className="fa-solid fa-cart-shopping navCartIcon"
              onClick={() => setopenNav(false)}
            ></i>

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
        </nav>
      </header>
    </>
  );
}

export default Navbar;
