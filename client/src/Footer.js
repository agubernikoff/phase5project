import React from "react";
import { NavLink } from "react-router-dom";

function Footer({ user, logout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => logout());
  }

  const hasPreorderProject = user.projects.filter(
    (project) => project.status === "Preorder"
  );

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

  return (
    <div style={{ width: "16.5%", textAlign: "right" }}>
      <h3>FOOTER</h3>
      <div>
        <span> {user.username.toUpperCase()}</span>
        <img
          alt="propic"
          src={user.profile_picture}
          style={{ width: "6.5%" }}
        />
      </div>
      {user.isSeller ? (
        <>
          <p>MY STORE</p>
          <NavLink to={"/newprojectform"} style={activeStyle}>
            START A NEW PROJECT
          </NavLink>
          <br />
          <br />
          {user.projects[0] ? (
            <>
              <NavLink to={"/newpost"} style={activeStyle}>
                ADD TO A PROJECT
              </NavLink>
              <br />
              <br />
            </>
          ) : null}
          {hasPreorderProject[0] ? (
            <>
              <NavLink to={"/newproductionupdate"} style={activeStyle}>
                PRODUCTION UPDATE
              </NavLink>
              <br />
              <br />{" "}
            </>
          ) : null}
        </>
      ) : (
        <p>MY ACCOUNT</p>
      )}
      <NavLink to={"/login"} onClick={handleLogout} style={activeStyle}>
        LOGOUT
      </NavLink>
    </div>
  );
}

export default Footer;
