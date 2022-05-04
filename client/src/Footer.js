import React from "react";
import { Link } from "react-router-dom";

function Footer({ user, logout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => logout());
  }
  return (
    <div style={{ width: "16.5%", textAlign: "right" }}>
      <h3>FOOTER</h3>
      <div>
        <span> {user.username.toUpperCase()}</span>
        <img alt="propic" src={user.profile_picture} style={{ width: "10%" }} />
      </div>
      <p>{user.isSeller ? "MY STORE" : "ACCOUNT"}</p>
      <Link to={"/newprojectform"} style={{ textDecoration: "none" }}>
        START A NEW PROJECT
      </Link>
      <br />
      <br />
      {user.projects[0] ? (
        <Link to={"/newpost"} style={{ textDecoration: "none" }}>
          ADD TO A PROJECT
        </Link>
      ) : null}
      <br />
      <br />
      <Link
        to={"/login"}
        onClick={handleLogout}
        style={{ textDecoration: "none" }}
      >
        LOGOUT
      </Link>
    </div>
  );
}

export default Footer;
