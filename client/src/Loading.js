import React from "react";
import { useState, useEffect } from "react";

function Loading() {
  const [index, setIndex] = useState(13);
  const loading = "...LOADING...";
  const loadingArray = loading.split("");
  useEffect(() => {
    let timer = setTimeout(() => {
      if (index > -13) setIndex(index - 1);
      else if (index === -13) setIndex(12);
    }, 111);
    return function cleanup() {
      clearTimeout(timer);
    };
  });
  return (
    <div
      style={{
        display: "block",
        margin: "auto",
        width: "fit-content",
      }}
    >
      <>
        {loadingArray.splice(index)}
        {loadingArray}
      </>
    </div>
  );
}

export default Loading;
