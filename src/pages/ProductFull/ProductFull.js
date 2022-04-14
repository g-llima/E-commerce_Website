import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useCart } from "react-use-cart";

import "./ProductFull.css";

function convertProductPrice(value) {
  if (value === undefined) return;
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
}

const imgTest = [
  "https://technext.github.io/cozastore/images/product-14.jpg",
  "https://stickerly.pstatic.net/sticker_pack/EpE633NkJy54pdwXnftzJA/TVJ7PX/43/1f32f4f2-afec-46a1-8788-5750cc7e3019.png",
  "https://i1.sndcdn.com/artworks-bvVASuE05viMMAio-Xre1qw-t500x500.jpg",
  "https://i.kym-cdn.com/entries/icons/original/000/038/638/the_wock.jpg",
];

function ProductFull({ product }) {
  const [newProduct, setNewProduct] = useState(product);
  const [colorSelected, setColorSelected] = useState(0);
  const [imageSelected, setImageSelected] = useState(0);

  const [productInput, setProductInput] = useState({
    size: Object.values(newProduct.sizes[0]),
    color: Object.keys(newProduct.colors[colorSelected]),
  });
  const { addItem, removeItem, inCart } = useCart();

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      productName:
        product.productName +
        " ---" +
        Object.values(productInput.size) +
        "-" +
        Object.values(productInput.color),
    });
  }, [productInput, product]);

  useEffect(() => {
    setProductInput({
      ...productInput,
      ["color"]: Object.keys(newProduct.colors[colorSelected]),
    });
  }, [colorSelected]);

  console.log(imageSelected);

  return (
    <div className="productFull">
      <div className="productFull__content">
        {/*---------------- PRODUCT IMAGE ------------------*/}
        <div className="productFull__content__img">
          <img
            // src={product.productImageLink}
            src={imgTest[imageSelected]}
            alt={product.productName}
            className="productFull__content__img__mainImg"
          />
          <div className="productFull__content__img__icons">
            {imgTest.map((x, i) => (
              <img
                className="productFull__content__img__icons__icon"
                src={x}
                alt={i}
                key={i}
                onClick={() => setImageSelected(i)}
              />
            ))}
          </div>
        </div>
        <div className="productFull__content__texts">
          {/*---------------- TITLE ------------------*/}
          <h1 className="productFull__content__texts__title">
            {product.productName}
          </h1>

          {/*---------------- PRICE ------------------*/}
          <div className="productFull__content__texts__title__prices">
            {product.isPromotion && (
              <p className="productFull__content__texts__title__prices__priceBefore">
                R$ {convertProductPrice(product.productPriceBefore)}
              </p>
            )}
            <h2 className="productFull__content__texts__title__prices__price">
              R$ {convertProductPrice(product.price)}
            </h2>
          </div>

          {/*---------------- COLORS ------------------*/}
          <div className="productFull__content__texts__colors">
            <p className="productFull__content__texts__colors__text">
              <span>Cor</span>: {Object.keys(product.colors[colorSelected])}
            </p>
            <div className="productFull__content__texts__colors__items">
              {product.colors.map((item, index) =>
                Object.values(item).map((color) => (
                  <span
                    key={index}
                    className={
                      colorSelected === index
                        ? "productFull__color__selected"
                        : null
                    }
                    style={{ backgroundColor: color }}
                    onClick={() => setColorSelected(index)}
                  >
                    <i className="fa-solid fa-check"></i>
                  </span>
                ))
              )}
            </div>
          </div>

          {/*---------------- MIDDLE BUTTONS ------------------*/}
          <div className="productFull__content__texts__buttons">
            <div className="productFull__content__texts__buttons__size">
              <p>Tamanho: </p>
              <select
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    ["size"]: e.target.value,
                  })
                }
              >
                {product.sizes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/*---------------- QUANTITY BUTTON ------------------*/}
            <div className="productFull__content__texts__buttons__qnt">
              <i
                className="fa-solid fa-minus"
                onClick={() =>
                  newProduct.quantity > 1 &&
                  setNewProduct({
                    ...newProduct,
                    quantity: newProduct.quantity - 1,
                  })
                }
              ></i>
              {newProduct.quantity}
              <i
                className="fa-solid fa-plus"
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    quantity: newProduct.quantity + 1,
                  })
                }
              ></i>
            </div>

            {/*---------------- ADD TO CART BUTTON ------------------*/}
            <button
              className={`productFull__content__texts__buttons__addCartBTN ${
                inCart(newProduct.id) && "ProductFull_Btn_InCart"
              }`}
              onClick={() =>
                !inCart(newProduct.id)
                  ? addItem(newProduct, newProduct.quantity)
                  : removeItem(newProduct.id)
              }
            >
              <p
                className={
                  inCart(newProduct.id)
                    ? "ProductFull_InCart"
                    : "productFull_NotCart"
                }
              >
                ADICIONAR NO
              </p>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>

          {/*---------------- PRODUCT DESCRIPTION ------------------*/}
          <div className="productFull__content__texts__description">
            <h4 className="productFull__content__texts__description__title">
              DESCRIÇÃO
            </h4>
            <p className="productFull__content__texts__description__text">
              {product.productDescription}
            </p>
          </div>

          {/*---------------- SHARE PRODUCT ------------------*/}
          <div className="productFull__content__texts__share">
            <h4>COMPARTILHE</h4>
            <div className="productFull__content__texts__share__icons">
              <Link to="/">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFull;
