import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ logout, user }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => logout());
  }

  return (
    <div>
      hello <img alt="propic" src={user.profile_picture} />
      {user.username} you are a {user.isSeller ? "seller" : "buyer"} welcome to
      the homepage
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/newprojectform")}>
        Start a new project
      </button>
      {user.projects[0] ? (
        <button onClick={() => navigate("/newpost")}>Add to a project</button>
      ) : null}
    </div>
  );
}

export default Home;
