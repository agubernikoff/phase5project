import React from "react";
import ProductPreview from "./ProductPreview";

function Marketplace({ products }) {
  const mappedProductPreviews = products.map((product) => (
    <ProductPreview key={product.id} product={product} />
  ));
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>MARKETPLACE</h3>
      <div className="marketplace">{mappedProductPreviews}</div>
    </div>
  );
}

export default Marketplace;
