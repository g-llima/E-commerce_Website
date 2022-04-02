import React from "react";

import "./ProductPreview.css";

function ProductPreview({ productName, clickBackground }) {
  return (
    <>
      <div className="productPreviewBackground" onClick={clickBackground}></div>
      <div className="productPreview">
        <div className="productPreview__content">{productName}</div>
      </div>
    </>
  );
}

export default ProductPreview;
