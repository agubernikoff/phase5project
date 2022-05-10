import React from "react";
import Product from "./Product";

function Marketplace({ products }) {
  const mappedProducts = products.map((product) => (
    <Product key={product.id} product={product} />
  ));
  return <div>Marketplace{mappedProducts}</div>;
}

export default Marketplace;
