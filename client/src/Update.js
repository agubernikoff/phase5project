import React from "react";

function Update({ update }) {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRight: "none",
        borderLeft: "none",
        margin: "auto",
        marginTop: 5,
        width: "100%",
      }}
    >
      <span>STATUS: {update.status}</span>
      <span style={{ float: "right" }}>
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
      <p>{update.caption}</p>
    </div>
  );
}

export default Update;
