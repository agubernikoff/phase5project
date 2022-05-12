import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

function Cart({ putCurrentOrder, currentOrder }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/current_order").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          putCurrentOrder(data);
          setLoading(false);
        });
      } else {
        r.json().then((data) => {
          console.log(data);
          setLoading(false);
        });
      }
    });
  }, [putCurrentOrder]);
  console.log(currentOrder);
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  const mappedItems = currentOrder
    ? currentOrder.items.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <img alt={item.product.name} src={item.product.image} />
          <div>
            <p>{item.product.name}</p>
            <p>{item.product.seller.toUpperCase()}</p>
            <p>{item.size.toUpperCase()}</p>
          </div>
          <p>{formatter.format(item.product.price)}</p>
          <p>{item.quantity}</p>
          <p>{formatter.format(item.price)}</p>
        </div>
      ))
    : null;

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

  return (
    <div>
      {loading ? <Loading /> : null}
      {currentOrder ? (
        <>
          <h1>ORDER SUMMARY:</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              width: "50%",
              position: "relative",
              left: "50%",
            }}
          >
            <p>
              <strong>TOTAL PRICE</strong>
            </p>
            <p>
              <strong>QUANTITY</strong>
            </p>
            <p>
              <strong>ITEM PRICE</strong>
            </p>
            <p>
              <strong>ITEM</strong>
            </p>
          </div>
          {mappedItems}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          YOUR CART IS EMPTY. PLEASE VISIT THE{" "}
          <NavLink to={"/marketplace"} style={activeStyle}>
            MARKETPLACE
          </NavLink>{" "}
          TO BROWSE AVAILABLE PRODUCTS
        </p>
      )}
    </div>
  );
}

export default Cart;
