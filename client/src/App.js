import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NewProjectForm from "./NewProjectForm";
import NewPost from "./NewPost";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function logout() {
    setUser("");
  }

  if (!user)
    return (
      <div>
        <Login onLogin={setUser} />
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login onLogin={setUser} />} />
        <Route exact path="/" element={<Home logout={logout} user={user} />} />
        <Route
          exact
          path="/newprojectform"
          element={<NewProjectForm user={user} />}
        />
        <Route exact path="/newpost" element={<NewPost user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
