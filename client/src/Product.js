import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Product({ user, currentOrder, setCurrentOrder, updateCurrentOrder }) {
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState([]);
  const [unauthorized, setUnauthorized] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.main_image);
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

  console.log(currentOrder);

  function handleAddToCart() {
    setLoading(true);
    if (!color) {
      setErrors(["Please select a color"]);
      setLoading(false);
    } else if (!size) {
      setErrors(["Please select a size"]);
      setLoading(false);
    } else if (!currentOrder) {
      fetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: product.id }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setCurrentOrder(data);
            fetch("/order_items", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                quantity: parseInt(quantity),
                price: parseInt(quantity) * product.price,
                size: size,
                order_id: data.id,
                product_id: product.id,
                color: color.color,
              }),
            }).then((r) => {
              if (r.ok) {
                r.json().then((data) => {
                  console.log(data, "this");
                  updateCurrentOrder(data);
                  setLoading(false);
                  navigate("/cart");
                });
              } else {
                r.json().then((data) => {
                  setErrors([data.error]);
                  setLoading(false);
                });
              }
            });
          });
          setLoading(false);
        } else {
          r.json().then((data) => setUnauthorized(data.error));
          setLoading(false);
        }
      });
    } else {
      fetch("/order_items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: parseInt(quantity),
          price: parseInt(quantity) * product.price,
          size: size,
          order_id: currentOrder.id,
          product_id: product.id,
          color: color.color,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data, "that");
            updateCurrentOrder(data);
            setLoading(false);
            navigate("/cart");
          });
        } else {
          r.json().then((data) => {
            setErrors([data.error]);
            setLoading(false);
          });
        }
      });
    }
  }

  const mappedColors = product
    ? product.colors.map((c) => (
        <div
          key={c.color}
          style={
            color.color === c.color
              ? {
                  width: "5vw",
                  height: "5vw",
                  borderRadius: 100,
                  border: "3px solid black",
                  backgroundColor: `${c.color}`,
                  margin: "5px",
                }
              : {
                  width: "5vw",
                  height: "5vw",
                  borderRadius: 100,
                  border: "1px solid black",
                  backgroundColor: `${c.color}`,
                  margin: "5px",
                }
          }
          onClick={() => {
            setColor(product.colors.find((color) => color.color === c.color));
          }}
        ></div>
      ))
    : null;

  const totalInventory = product
    ? product.colors
        .map((c) => c.inventory)
        .reduce((partialSum, a) => partialSum + a, 0)
    : null;
  console.log(errors[0]);
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
          <img
            src={product.main_image}
            alt={product.name}
            style={{ width: "75%", border: "1px solid black", padding: 1 }}
            onClick={() => setMainImage(product.main_image)}
          />
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
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>
          {totalInventory ? (
            <p>{formatter.format(product.price)}</p>
          ) : (
            <p>SOLD OUT</p>
          )}
          <p>{product.description}</p>
          <br />
          <label>COLOR:</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {mappedColors}
          </div>
          <br />
          {!color.one_size_fits_all ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label>SIZE:</label>
              {color.xs ? (
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
              {color.s ? (
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
              {color.m ? (
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
              {color.l ? (
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
              {color.xl ? (
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
              {color.xxl ? (
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
          {totalInventory ? (
            <button onClick={handleAddToCart}>
              {loading ? <Loading /> : "ADD TO CART"}
            </button>
          ) : (
            <button>SOLD OUT</button>
          )}
          {unauthorized[0] ? (
            <p
              style={{
                textAlign: "center",
                width: "95%",
                margin: "auto",
                marginBottom: "1vw",
              }}
            >
              <strong>{unauthorized[0]}</strong>
              {unauthorized[1] +
                unauthorized[2] +
                new Date(unauthorized[3])
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  .toUpperCase() +
                " AT " +
                new Date(unauthorized[3]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>
          ) : (
            errors.map((err) => (
              <h3
                key={err}
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                {err}
              </h3>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
