import React from "react";

function ProductPreview({ product }) {
  console.log(product);
  return (
    <div className="productPreview">
      <img
        src={product.images[0].url}
        alt={product.name}
        style={{ width: "100%" }}
      />
      <div className="productInfo">
        <p>{product.seller.toUpperCase()}</p>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductPreview;
