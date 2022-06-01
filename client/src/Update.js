import React from "react";

function Update({ update }) {
  return (
    <div
      style={
        update.status === "On Schedule"
          ? {
              margin: "auto",
              marginTop: 5,
              width: "100%",
            }
          : {
              margin: "auto",
              marginTop: 5,
              width: "100%",
            }
      }
    >
      <span
        style={
          update.status === "On Schedule"
            ? { color: "green" }
            : { color: "red" }
        }
      >
        <strong style={{ color: "black" }}>STATUS: </strong> {update.status}
      </span>
      <span style={{ float: "right", fontSize: ".75vw", color: "grey" }}>
        {new Date(update.created_at)
          .toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
          .toUpperCase()}
      </span>
      {update.images
        ? update.images.map((i) => (
            <img
              key={i.url}
              src={i.url}
              alt={"content"}
              style={{ width: "100%" }}
            />
          ))
        : null}
      <p style={{ marginLeft: "1vw" }}>{update.caption}</p>
    </div>
  );
}

export default Update;
