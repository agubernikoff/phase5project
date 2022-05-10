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

  const hasForSaleProjects = user.projects.find(
    (project) => project.status === "For Sale"
  );

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

  return (
    <div style={{ width: "16.5%", textAlign: "right" }}>
      {/* <h3>FOOTER</h3> */}
      <div>
        <h3 style={{ display: "inline-block" }}>
          {user.username.toUpperCase()}
        </h3>
        <img
          alt="propic"
          src={user.profile_picture}
          style={{ width: "10%", borderRadius: 20 }}
        />
      </div>
      {user.isSeller ? (
        <>
          <NavLink to={`/u/${user.id}`} style={activeStyle}>
            MY STORE
          </NavLink>
          <br />
          <br />
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
          {hasForSaleProjects ? (
            <>
              <NavLink to={"/newproduct"} style={activeStyle}>
                LIST A PRODUCT FOR SALE
              </NavLink>
              <br />
              <br />{" "}
            </>
          ) : null}
        </>
      ) : (
        <>
          <NavLink to={`/u/${user.id}`} style={activeStyle}>
            MY ACCOUNT
          </NavLink>
          <br />
          <br />
        </>
      )}
      <NavLink to={"/login"} onClick={handleLogout} style={activeStyle}>
        LOGOUT
      </NavLink>
    </div>
  );
}

export default Footer;
