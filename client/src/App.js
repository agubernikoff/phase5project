import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Feed from "./Feed";
import NewProjectForm from "./NewProjectForm";
import NewPost from "./NewPost";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data));
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

  function updatePosts(newPost) {
    setPosts([...posts, newPost]);
  }

  if (!user)
    return (
      <div>
        <Login onLogin={setUser} />
      </div>
    );

  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Header />
      <div style={{ width: "66%" }}>
        <Routes>
          <Route exact path="/login" element={<Login onLogin={setUser} />} />
          <Route
            exact
            path="/"
            element={<Home logout={logout} user={user} />}
          />
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
                updatePosts={updatePosts}
              />
            }
          />
          <Route exact path="/feed" element={<Feed posts={posts} />} />
        </Routes>
      </div>
      <Footer user={user} logout={logout} />
    </div>
  );
}

export default App;
