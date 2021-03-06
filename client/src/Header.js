import React from "react";
import { NavLink } from "react-router-dom";

function Header({ comingSoonClass }) {
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;
  return (
    <div style={{ width: "16.5%" }}>
      <h3>FEEDBACK MARKET</h3>
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
      <NavLink
        className={comingSoonClass}
        to={"/comingsoon"}
        style={activeStyle}
      >
        COMING SOON
      </NavLink>
      <br />
      <br />
      <NavLink to={"/marketplace"} style={activeStyle}>
        MARKETPLACE
      </NavLink>
    </div>
  );
}

export default Header;
