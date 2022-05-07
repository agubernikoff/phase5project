import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;
  return (
    <div style={{ width: "16.5%" }}>
      <h3>INSERT TITLE HERE</h3>
      <NavLink to={"/"} style={activeStyle}>
        HOME
      </NavLink>
      <br />
      <br />
      <NavLink to={"/feed"} style={activeStyle}>
        FEED
      </NavLink>
      <br />
      <br />
      <NavLink to={"/comingsoon"} style={activeStyle}>
        COMING SOON
      </NavLink>
      <p>MARKETPLACE</p>
    </div>
  );
}

export default Header;
