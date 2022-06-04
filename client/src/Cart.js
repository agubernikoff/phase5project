import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

function Cart({
  putCurrentOrder,
  currentOrder,
  updateCurrentOrderOnRemoveItem,
}) {
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

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
  }, []);
  console.log(currentOrder);
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  function handleRemoveItem() {
    fetch(`/order_items/${hovered}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok)
        r.json().then((data) => updateCurrentOrderOnRemoveItem(hovered));
    });
  }

  function handleCancelOrder() {
    fetch(`/orders/${currentOrder.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) r.json().then((data) => putCurrentOrder(""));
    });
  }

  const mappedItems = currentOrder
    ? currentOrder.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            marginBottom: "1vw",
          }}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            alt={item.product.name}
            src={item.product.main_image}
            style={{ width: "30%" }}
          />
          <div>
            <p>{item.product.name}</p>
            <p>{item.product.seller.toUpperCase()}</p>
            <p>{item.size.toUpperCase()}</p>
            <div
              style={{
                width: "2.5vw",
                height: "2.5vw",
                borderRadius: 100,
                border: "1px solid black",
                backgroundColor: `${item.color}`,
              }}
            ></div>
          </div>
          <p>{formatter.format(item.product.price)}</p>
          <p>{item.quantity}</p>
          <p>{formatter.format(item.price)}</p>
          {hovered === item.id ? (
            <button
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
              onClick={handleRemoveItem}
            >
              REMOVE ITEM
            </button>
          ) : null}
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
      {currentOrder ? (
        <div
          style={{
            float: "right",
            width: "25%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ borderColor: "red", color: "red" }}
            onClick={handleCancelOrder}
          >
            CANCEL
          </button>
          <button style={{ borderColor: "green", color: "green" }}>
            CHECKOUT
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
