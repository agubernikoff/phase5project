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

  function updateUserProjects(newProject) {
    const updatedProjects = [...user.projects, newProject];
    setUser({ ...user, projects: updatedProjects });
  }

  function updateUserProjectsPosts(newPost) {
    const updatedPosts = [
      ...user.projects.find((p) => p.id === newPost.project_id).posts,
      newPost,
    ];
    const updatedProject = {
      ...user.projects.find((p) => p.id === newPost.project_id),
      posts: updatedPosts,
    };
    const filteredProjects = user.projects.filter(
      (p) => p.id !== newPost.project_id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setUser({ ...user, projects: sortedProjects });
  }
  console.log(user);

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
          element={
            <NewProjectForm
              user={user}
              updateUserProjects={updateUserProjects}
            />
          }
        />
        <Route
          exact
          path="/newpost"
          element={
            <NewPost
              user={user}
              updateUserProjectsPosts={updateUserProjectsPosts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
