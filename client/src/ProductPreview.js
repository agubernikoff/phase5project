import React from "react";
import { useNavigate } from "react-router-dom";

function ProductPreview({ product }) {
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const totalInventory = product.colors
    .map((c) => c.inventory)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div
      className="productPreview"
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
      style={{ display: "block", margin: "auto" }}
    >
      <img
        src={product.main_image}
        alt={product.name}
        style={{ width: "100%" }}
      />
      <div className="productInfo">
        <p>{product.seller}</p>
        <p>{product.name}</p>
        {totalInventory ? (
          <p>{formatter.format(product.price)}</p>
        ) : (
          <p>SOLD OUT</p>
        )}
      </div>
    </div>
  );
}

export default ProductPreview;
