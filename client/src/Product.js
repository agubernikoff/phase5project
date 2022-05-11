import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState("");
  let { id } = useParams();
  useEffect(() => {
    fetch(`/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        window.scrollTo(0, 0);
      });
  }, [id]);
  console.log(product);
  return <div>Product</div>;
}

export default Product;
