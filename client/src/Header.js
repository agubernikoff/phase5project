import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ width: "16.5%" }}>
      <h3>INSERT TITLE HERE</h3>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        HOME
      </Link>
      <br />
      <Link to={"/feed"} style={{ textDecoration: "none" }}>
        FEED
      </Link>
      <p>COMING SOON</p>
      <p>MARKETPLACE</p>
    </div>
  );
}

export default Header;
