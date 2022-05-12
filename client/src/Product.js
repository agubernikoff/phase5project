import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loading from "./Loading";

function Product({ user }) {
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("");

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

  console.log(product.price * quantity);

  function handleAddToCart() {
    setLoading(true);
    if (!size) {
      setErrors(["Please select a size"]);
      setLoading(false);
    } else {
      fetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => console.log(data));
          setLoading(false);
        } else {
          r.json().then((data) => console.log(data));
          setLoading(false);
        }
      });
    }
  }

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
              {product.xs ? (
                <button
                  style={
                    size === "xs"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"xs"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  XS
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  XS
                </button>
              )}
              {product.s ? (
                <button
                  style={
                    size === "s"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"s"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  S
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  S
                </button>
              )}
              {product.m ? (
                <button
                  style={
                    size === "m"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"m"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  M
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  M
                </button>
              )}
              {product.l ? (
                <button
                  style={
                    size === "l"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"l"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  L
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  L
                </button>
              )}
              {product.xl ? (
                <button
                  style={
                    size === "xl"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"xl"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  XL
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  XL
                </button>
              )}
              {product.xxl ? (
                <button
                  style={
                    size === "xxl"
                      ? {
                          width: "fit-content",
                          margin: "auto",
                          backgroundColor: "green",
                          color: "white",
                        }
                      : { width: "fit-content", margin: "auto" }
                  }
                  value={"xxl"}
                  onClick={(e) => setSize(e.target.value)}
                >
                  XXL
                </button>
              ) : (
                <button
                  style={{ width: "fit-content", margin: "auto" }}
                  disabled
                >
                  XXL
                </button>
              )}
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
              <button
                style={
                  size === "one_size_fits_all"
                    ? {
                        width: "fit-content",
                        marginLeft: 5,
                        backgroundColor: "green",
                        color: "white",
                      }
                    : { width: "fit-content", marginLeft: 5 }
                }
                value={"one_size_fits_all"}
                onClick={(e) => setSize(e.target.value)}
              >
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
          <button onClick={handleAddToCart}>
            {loading ? <Loading /> : "ADD TO CART"}
          </button>
          {errors.map((err) => (
            <h3
              key={err}
              style={{ display: "block", margin: "auto", marginTop: 10 }}
            >
              {err}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
