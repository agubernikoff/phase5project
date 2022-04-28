import React from "react";

function Home({ logout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => logout());
  }
  console.log(user);
  return (
    <div>
      hello {user.username} you are a {user.isSeller ? "seller" : "buyer"}{" "}
      welcome to the homepage
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
