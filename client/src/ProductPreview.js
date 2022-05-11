import React from "react";
import { useNavigate } from "react-router-dom";

function ProductPreview({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="productPreview"
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <img
        src={product.images[0].url}
        alt={product.name}
        style={{ width: "100%" }}
      />
      <div className="productInfo">
        <p>{product.seller}</p>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductPreview;
