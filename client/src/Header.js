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
      <br />
      <Link to={"/feed"} style={{ textDecoration: "none" }}>
        FEED
      </Link>
      <br />
      <br />
      <Link to={"/comingsoon"} style={{ textDecoration: "none" }}>
        COMING SOON
      </Link>
      <p>MARKETPLACE</p>
    </div>
  );
}

export default Header;
