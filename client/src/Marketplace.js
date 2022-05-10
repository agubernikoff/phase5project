import React from "react";
import ProductPreview from "./ProductPreview";

function Marketplace({ products }) {
  const mappedProductPreviews = products.map((product) => (
    <ProductPreview key={product.id} product={product} />
  ));
  return <div className="marketplace">{mappedProductPreviews}</div>;
}

export default Marketplace;
