import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0].url);
        window.scrollTo(0, 0);
      });
  }, [id]);

  const mappedImages = product
    ? product.images.map((image) => (
        <img
          key={image.url}
          src={image.url}
          alt={product.name}
          style={{ width: "75%", border: "1px solid black", padding: 1 }}
          onClick={() => setMainImage(image.url)}
        />
      ))
    : null;

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <img
        alt={product.seller}
        src={product.seller_pic}
        style={{ width: "10%", borderRadius: 50 }}
      />
      <NavLink style={{ fontSize: 108 }} to={`/u/${product.seller_id}`}>
        {product.seller}{" "}
      </NavLink>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          {mappedImages}
        </div>
        <div style={{ width: "45%" }}>
          <img src={mainImage} alt={product.name} style={{ width: "100%" }} />
        </div>
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "1%",
          }}
        >
          <h1>{product.name}</h1>
          <p>{formatter.format(product.price)}</p>
          <p>{product.description}</p>
          <br />
          {!product.one_size_fits_all ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label>SIZE:</label>
              <button style={{ width: "fit-content", margin: "auto" }}>
                XS
              </button>
              <button style={{ width: "fit-content", margin: "auto" }}>
                S
              </button>
              <button style={{ width: "fit-content", margin: "auto" }}>
                M
              </button>
              <button style={{ width: "fit-content", margin: "auto" }}>
                L
              </button>
              <button style={{ width: "fit-content", margin: "auto" }}>
                XL
              </button>
              <button style={{ width: "fit-content", margin: "auto" }}>
                XXL
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label>Size:</label>
              <button style={{ width: "fit-content", marginLeft: 5 }}>
                ONE SIZE FITS ALL
              </button>
            </div>
          )}
          <br />
          <br />
          <div>
            <label htmlFor="quantity">QUANTITY: </label>
            <input
              type="number"
              id="title"
              autoComplete="off"
              value={quantity}
              min="1"
              max={product.inventory}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br />
          <br />
          <button>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
