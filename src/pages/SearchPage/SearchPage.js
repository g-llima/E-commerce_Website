import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../ProductsContext";
import { useCart } from "react-use-cart";
import { HashLink as Link } from "react-router-hash-link";

import "./SearchPage.css";

import Card from "../../components/Cards/Card/Card";
import ProductPreview from "../../components/ProductPreview/ProductPreview";

function SearchPage() {
  const [products, setProducts] = useState([]);
  const { s } = useParams();
  const { inCart } = useCart();
  const [isOpenPreview, setIsOpenPreview] = useState(-1);
  const [search] = useState(s.substring(2).toLowerCase());

  const { contextValue } = useContext(ProductsContext);

  let tempProducts = [];

  useEffect(() => {
    contextValue.map((item) => {
      if (item["productName"].toLowerCase().includes(search)) {
        tempProducts.push(item);
      }
    });
    setProducts(tempProducts);
  }, [contextValue]);

  function convertProductName(str) {
    if (str.length >= 30) {
      return str.substring(0, 30) + "...";
    }
    return str;
  }
  function covertProductPrice(value) {
    if (value === undefined) return;

    value = value.toString();
    return (
      value.substring(0, value.length - 2) +
      "," +
      value.substring(value.length - 2)
    );
  }

  return (
    <div className="searchPage">
      <div className="searchPage__container">
        {products.length == 0 && (
          <div className="searchPage__container__notFound">
            <h1>Nenhum produto encontrado.</h1>
            <Link to="/">Voltar para a página inicial</Link>
          </div>
        )}
        {products.map((item, index) => (
          <div key={index}>
            <Card
              productImage={item.productImageLink[0]}
              productName={convertProductName(item.productName)}
              productPrice={covertProductPrice(item.price)}
              productType={item.productType}
              productDescription={item.productDesc}
              btnName={inCart(item.id) ? "Remove from Cart" : "Add to Cart"}
              onCart={inCart(item.id)}
              colors={item.colors}
              isInCart={inCart(item.id)}
              isPromotion={item.isPromotion}
              productPriceBefore={covertProductPrice(item.productPriceBefore)}
              clickBtn={() =>
                isOpenPreview === index
                  ? setIsOpenPreview(-1)
                  : setIsOpenPreview(index)
              }
            />
            {isOpenPreview === index && (
              <ProductPreview
                product={item}
                clickBackground={() => setIsOpenPreview(-1)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
