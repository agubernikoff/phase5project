import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Feed from "./Feed";
import ComingSoon from "./ComingSoon";
import NewProjectForm from "./NewProjectForm";
import NewPost from "./NewPost";
import ProductionUpdate from "./ProductionUpdate";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [preOrderProjects, setPreOrderProjects] = useState([]);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data));
    fetch("/projects")
      .then((r) => r.json())
      .then((data) => setPreOrderProjects(data));
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

  function updateUserLikesOnLike(newLike) {
    setUser({ ...user, likes: [...user.likes, newLike] });
  }

  function updateUserLikesOnUnlike(unlikeID) {
    const filtered = user.likes.filter((uL) => uL.id !== unlikeID);
    setUser({ ...user, likes: filtered });
  }

  function updatePosts(newPost) {
    setPosts([...posts, newPost]);
  }

  function updatePostLikesOnLike(newLike) {
    const likedPost = posts.find((p) => p.id === newLike.post_id);
    const updatedLikes = [...likedPost.likes, newLike];
    const updatedPost = { ...likedPost, likes: updatedLikes };
    const filteredPosts = posts.filter((p) => p.id !== newLike.post_id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sorted = updatedPosts.sort((a, b) => b.id - a.id);
    setPosts(sorted);
  }

  function updatePostsOnLikesThreshold(data) {
    const likedPost = posts.find((p) => p.id === data.like.post_id);
    const updatedLikes = [...likedPost.likes, data.like];
    const updatedPost = { ...likedPost, likes: updatedLikes };
    const mappedIds = data.updated_project_posts.map((upp) => upp.id);
    const projectPosts = posts.filter((p) => mappedIds.includes(p.id));
    const filteredProjectPosts = projectPosts.filter(
      (p) => p.id !== updatedPost.id
    );
    const updatedFilteredProjectPosts = [...filteredProjectPosts, updatedPost];
    const updatedProjectPosts = updatedFilteredProjectPosts.map((p) => {
      return { ...p, message: data.message };
    });
    const filteredPosts = posts.filter((p) => !mappedIds.includes(p.id));
    const updatedPosts = [...filteredPosts, ...updatedProjectPosts];
    const sorted = updatedPosts.sort((a, b) => b.id - a.id);
    setPosts(sorted);
    setTimeout(() => setPosts(filteredPosts), 5000);
  }

  function updatePostLikesOnUnlike(unlike) {
    const unLikedPost = posts.find((p) => p.id === unlike.post_id);
    const filtered = unLikedPost.likes.filter((l) => l.id !== unlike.id);
    const updatedPost = { ...unLikedPost, likes: filtered };
    const filteredPosts = posts.filter((p) => p.id !== unLikedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sorted = updatedPosts.sort((a, b) => b.id - a.id);
    setPosts(sorted);
  }

  function updatePostCommentsOnComment(newComment) {
    const likedPost = posts.find((p) => p.id === newComment.post_id);
    const updatedComments = [...likedPost.comments, newComment];
    const updatedPost = { ...likedPost, comments: updatedComments };
    const filteredPosts = posts.filter((p) => p.id !== newComment.post_id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sorted = updatedPosts.sort((a, b) => b.id - a.id);
    setPosts(sorted);
  }

  function updatePostCommentsOnDelete(deletedComment) {
    const post = posts.find((p) => p.id === deletedComment.post_id);
    const filtered = post.comments.filter((l) => l.id !== deletedComment.id);
    const updatedPost = { ...post, comments: filtered };
    const filteredPosts = posts.filter((p) => p.id !== post.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sorted = updatedPosts.sort((a, b) => b.id - a.id);
    setPosts(sorted);
  }

  function updateUserProjectProductionUpdates(newUpdate) {
    const project = user.projects.find((p) => p.id === newUpdate.project_id);
    const updatedUpdates = [...project.production_updates, newUpdate];
    const updatedProject = { ...project, production_updates: updatedUpdates };
    const filteredProjects = user.projects.filter(
      (p) => p.id !== newUpdate.project_id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sorted = updatedProjects.sort((a, b) => b.id - a.id);
    setUser({ ...user, projects: sorted });
  }

  function updateProjects(newUpdate) {
    const project = preOrderProjects.find((p) => p.id === newUpdate.project_id);
    const filteredProjects = preOrderProjects.filter(
      (p) => p.id !== newUpdate.project_id
    );
    const updatedProject = {
      ...project,
      production_updates: [...project.production_updates, newUpdate],
    };
    setPreOrderProjects([...filteredProjects, updatedProject]);
  }
  console.log(preOrderProjects);

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
          <Route
            exact
            path="/newproductionupdate"
            element={
              <ProductionUpdate
                user={user}
                updateUserProjectProductionUpdates={
                  updateUserProjectProductionUpdates
                }
                updateProjects={updateProjects}
              />
            }
          />
          <Route
            exact
            path="/feed"
            element={
              <Feed
                posts={posts}
                user={user}
                updateUserLikesOnLike={updateUserLikesOnLike}
                updateUserLikesOnUnlike={updateUserLikesOnUnlike}
                updatePostLikesOnLike={updatePostLikesOnLike}
                updatePostLikesOnUnlike={updatePostLikesOnUnlike}
                updatePostCommentsOnComment={updatePostCommentsOnComment}
                updatePostCommentsOnDelete={updatePostCommentsOnDelete}
                updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
              />
            }
          />
          <Route
            exact
            path="/comingsoon"
            element={<ComingSoon preOrderProjects={preOrderProjects} />}
          />
        </Routes>
      </div>
      <Footer user={user} logout={logout} />
    </div>
  );
}

export default App;
