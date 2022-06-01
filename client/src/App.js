import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Feed from "./Feed";
import ComingSoon from "./ComingSoon";
import Marketplace from "./Marketplace";
import Product from "./Product";
import Footer from "./Footer";
import Cart from "./Cart";
import Account from "./Account";
import NewProjectForm from "./NewProjectForm";
import NewPost from "./NewPost";
import ProductionUpdateForm from "./ProductionUpdateForm";
import ListAProduct from "./ListAProduct";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [preOrderProjects, setPreOrderProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("");
  const [postClass, setPostClass] = useState("");
  const [comingSoonClass, setComingSoonClass] = useState("");

  useEffect(() => {
    setAppLoading(true);
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setAppLoading(false);
        });
      } else setAppLoading(false);
    });
    fetch("/current_order").then((r) => {
      if (r.ok) {
        r.json().then((data) => setCurrentOrder(data));
      } else {
        r.json().then((data) => console.log(data));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data));
    fetch("/projects")
      .then((r) => r.json())
      .then((data) => setPreOrderProjects(data));
    fetch("/products")
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  function putCurrentOrder(data) {
    setCurrentOrder(data);
  }
  function adjustForQuantity(data) {
    const array = [];
    for (let i = 0; i < data.quantity; i++) {
      array.push(data);
    }
    return array;
  }

  function updateCurrentOrder(data) {
    console.log(currentOrder);
    const updatedSub = currentOrder.subtotal
      ? currentOrder.subtotal + data.price
      : data.price;
    const updatedItems = adjustForQuantity(data);
    setCurrentOrder({
      ...currentOrder,
      id: data.order_id,
      subtotal: updatedSub,
      items: currentOrder.items
        ? [...currentOrder.items, ...updatedItems]
        : [...updatedItems],
    });
  }

  function logout() {
    setUser("");
    setCurrentOrder("");
  }

  function updateUserOnEdit(user) {
    setUser(user);
  }

  function updateUserProjects(newProject) {
    const updatedProjects = [...user.projects, newProject];
    setUser({ ...user, projects: updatedProjects });
  }

  function updateUserOnSelfLikeThreshold(data) {
    const userProjectsIDs = user.projects.map((p) => p.id);
    if (userProjectsIDs.includes(data.updated_project.id)) {
      const likedPost = posts.find((p) => p.id === data.like.post_id);
      const updatedLikes = [...likedPost.likes, data.like];
      const updatedPost = { ...likedPost, likes: updatedLikes };
      const mappedIds = data.updated_project_posts.map((upp) => upp.id);
      const projectPosts = posts.filter((p) => mappedIds.includes(p.id));
      const filteredProjectPosts = projectPosts.filter(
        (p) => p.id !== updatedPost.id
      );
      const updatedFilteredProjectPosts = [
        ...filteredProjectPosts,
        updatedPost,
      ];
      const newProject = {
        ...data.updated_project,
        posts: updatedFilteredProjectPosts,
        production_updates: [],
      };
      const filteredUserProjects = user.projects.filter(
        (up) => up.id !== newProject.id
      );
      setUser({
        ...user,
        projects: [...filteredUserProjects, newProject],
        likes: [...user.likes, data.like],
      });
    }
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

  function updateUserLikesOnLike(like) {
    setUser({ ...user, likes: [...user.likes, like] });
  }

  function updateUserLikesOnUnlike(unlikeID) {
    const filtered = user.likes.filter((uL) => uL.id !== unlikeID);
    setUser({ ...user, likes: filtered });
  }

  function updatePosts(newPost) {
    setPosts([newPost, ...posts]);
  }

  function loadMorePosts(posts) {
    setPosts(posts);
  }

  function updatePostLikesOnLike(like) {
    const likedPost = posts.find((p) => p.id === like.post_id);
    if (likedPost) {
      const updatedLikes = [...likedPost.likes, like];
      const updatedPost = { ...likedPost, likes: updatedLikes };
      const filteredPosts = posts.filter((p) => p.id !== like.post_id);
      const updatedPosts = [...filteredPosts, updatedPost];
      const sorted = updatedPosts.sort((a, b) => b.id - a.id);
      setPosts(sorted);
    }
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
    // setPostClass("post-green");
    document.getElementById(`post${data.like.post_id}`).className =
      "post-green";
    setTimeout(() => {
      setPosts(filteredPosts);
      setComingSoonClass("green");
    }, 5000);
  }

  function updatePostLikesOnUnlike(unlike) {
    const unLikedPost = posts.find((p) => p.id === unlike.post_id);
    if (unLikedPost) {
      const filtered = unLikedPost.likes.filter((l) => l.id !== unlike.id);
      const updatedPost = { ...unLikedPost, likes: filtered };
      const filteredPosts = posts.filter((p) => p.id !== unLikedPost.id);
      const updatedPosts = [...filteredPosts, updatedPost];
      const sorted = updatedPosts.sort((a, b) => b.id - a.id);
      setPosts(sorted);
    }
  }

  function updatePostCommentsOnComment(newComment) {
    const likedPost = posts.find((p) => p.id === newComment.post_id);
    if (likedPost) {
      const updatedComments = [...likedPost.comments, newComment];
      const updatedPost = { ...likedPost, comments: updatedComments };
      const filteredPosts = posts.filter((p) => p.id !== newComment.post_id);
      const updatedPosts = [...filteredPosts, updatedPost];
      const sorted = updatedPosts.sort((a, b) => b.id - a.id);
      setPosts(sorted);
    }
  }

  function updatePostCommentsOnDelete(deletedComment) {
    const post = posts.find((p) => p.id === deletedComment.post_id);
    if (post) {
      const filtered = post.comments.filter((l) => l.id !== deletedComment.id);
      const updatedPost = { ...post, comments: filtered };
      const filteredPosts = posts.filter((p) => p.id !== post.id);
      const updatedPosts = [...filteredPosts, updatedPost];
      const sorted = updatedPosts.sort((a, b) => b.id - a.id);
      setPosts(sorted);
    }
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

  function updateProjectsOnThreshold(data) {
    const likedPost = posts.find((p) => p.id === data.like.post_id);
    const updatedLikes = [...likedPost.likes, data.like];
    const updatedPost = { ...likedPost, likes: updatedLikes };
    const mappedIds = data.updated_project_posts.map((upp) => upp.id);
    const projectPosts = posts.filter((p) => mappedIds.includes(p.id));
    const filteredProjectPosts = projectPosts.filter(
      (p) => p.id !== updatedPost.id
    );
    const updatedFilteredProjectPosts = [...filteredProjectPosts, updatedPost];
    const newProject = {
      ...data.updated_project,
      posts: updatedFilteredProjectPosts,
      production_updates: [],
      products: [],
    };
    setPreOrderProjects([...preOrderProjects, newProject]);
  }

  function updateProjectsOnProductionUpdate(newUpdate) {
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

  function updateProjectPostLikesOnLike(like) {
    const project = preOrderProjects.find((p) =>
      p.posts.find((p) => p.id === like.post_id)
    );
    const post = project.posts.find((p) => p.id === like.post_id);
    const updatedPost = { ...post, likes: [...post.likes, like] };
    const filteredProjectPosts = project.posts.filter(
      (pp) => pp.id !== post.id
    );
    const updatedProjectPosts = [...filteredProjectPosts, updatedPost].sort(
      (a, b) => a.id - b.id
    );
    const updatedProject = { ...project, posts: updatedProjectPosts };
    const filteredProjects = preOrderProjects.filter(
      (pop) => pop.id !== project.id
    );
    setPreOrderProjects([...filteredProjects, updatedProject]);
  }

  function updateProjectPostLikesOnUnlike(unlike) {
    const project = preOrderProjects.find((p) =>
      p.posts.find((p) => p.id === unlike.post_id)
    );
    const post = project.posts.find((p) => p.id === unlike.post_id);
    const filteredPostLikes = post.likes.filter((pl) => pl.id !== unlike.id);
    const updatedPost = { ...post, likes: filteredPostLikes };
    const filteredProjectPosts = project.posts.filter(
      (pp) => pp.id !== post.id
    );
    const updatedProjectPosts = [...filteredProjectPosts, updatedPost].sort(
      (a, b) => a.id - b.id
    );
    const updatedProject = {
      ...project,
      posts: updatedProjectPosts,
    };
    const filteredProjects = preOrderProjects.filter(
      (pop) => pop.id !== project.id
    );
    setPreOrderProjects([...filteredProjects, updatedProject]);
  }

  function updateProjectPostCommentsOnComment(newComment) {
    const project = preOrderProjects.find((p) =>
      p.posts.find((p) => p.id === newComment.post_id)
    );
    const post = project.posts.find((p) => p.id === newComment.post_id);
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    const filteredProjectPosts = project.posts.filter(
      (pp) => pp.id !== post.id
    );
    const updatedProjectPosts = [...filteredProjectPosts, updatedPost].sort(
      (a, b) => a.id - b.id
    );
    const updatedProject = { ...project, posts: updatedProjectPosts };
    const filteredProjects = preOrderProjects.filter(
      (pop) => pop.id !== project.id
    );
    setPreOrderProjects([...filteredProjects, updatedProject]);
  }

  function updateProjectPostCommentsOnDeletedComment(deletedComment) {
    const project = preOrderProjects.find((p) =>
      p.posts.find((p) => p.id === deletedComment.post_id)
    );
    const post = project.posts.find((p) => p.id === deletedComment.post_id);
    const filteredPostComments = post.comments.filter(
      (pl) => pl.id !== deletedComment.id
    );
    const updatedPost = { ...post, comments: filteredPostComments };
    const filteredProjectPosts = project.posts.filter(
      (pp) => pp.id !== post.id
    );
    const updatedProjectPosts = [...filteredProjectPosts, updatedPost].sort(
      (a, b) => a.id - b.id
    );
    const updatedProject = {
      ...project,
      posts: updatedProjectPosts,
    };
    const filteredProjects = preOrderProjects.filter(
      (pop) => pop.id !== project.id
    );
    setPreOrderProjects([...filteredProjects, updatedProject]);
  }

  function updateUserProjectsOnProductionComplete(data) {
    const projectToUpdate = user.projects.find((p) => p.id === data.project_id);
    const updatedProject = {
      ...projectToUpdate,
      status: "For Sale",
      production_updates: [...projectToUpdate.production_updates, data],
    };
    const filteredProjects = user.projects.filter(
      (p) => p.id !== data.project_id
    );
    const updatedUserProjects = [...filteredProjects, updatedProject];
    setUser({ ...user, projects: updatedUserProjects });
  }

  function updateProjectsOnProductionComplete(data) {
    const filteredProjects = preOrderProjects.filter(
      (pop) => pop.id !== data.project_id
    );
    setPreOrderProjects(filteredProjects);
  }

  function updateProductsOnNewListing(newProduct) {
    setProducts([...products, newProduct]);
  }

  if (!user)
    return (
      <div>
        <Login onLogin={setUser} appLoading={appLoading} />
      </div>
    );

  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Header comingSoonClass={comingSoonClass} />
      <div style={{ width: "66%" }}>
        <Routes>
          <Route exact path="/login" element={<Login onLogin={setUser} />} />
          <Route
            exact
            path="/"
            element={
              <Home
                logout={logout}
                user={user}
                updateUserLikesOnLike={updateUserLikesOnLike}
                updateUserLikesOnUnlike={updateUserLikesOnUnlike}
                updatePostLikesOnLike={updatePostLikesOnLike}
                updatePostLikesOnUnlike={updatePostLikesOnUnlike}
                updatePostCommentsOnComment={updatePostCommentsOnComment}
                updatePostCommentsOnDelete={updatePostCommentsOnDelete}
                updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
                updateProjectsOnThreshold={updateProjectsOnThreshold}
                updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
                updateProjectPostLikesOnLike={updateProjectPostLikesOnLike}
                updateProjectPostLikesOnUnlike={updateProjectPostLikesOnUnlike}
                updateProjectPostCommentsOnComment={
                  updateProjectPostCommentsOnComment
                }
                updateProjectPostCommentsOnDeletedComment={
                  updateProjectPostCommentsOnDeletedComment
                }
              />
            }
          />
          <Route
            exact
            path="/feed"
            element={
              <Feed
                posts={posts}
                postClass={postClass}
                loadMorePosts={loadMorePosts}
                user={user}
                updateUserLikesOnLike={updateUserLikesOnLike}
                updateUserLikesOnUnlike={updateUserLikesOnUnlike}
                updatePostLikesOnLike={updatePostLikesOnLike}
                updatePostLikesOnUnlike={updatePostLikesOnUnlike}
                updatePostCommentsOnComment={updatePostCommentsOnComment}
                updatePostCommentsOnDelete={updatePostCommentsOnDelete}
                updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
                updateProjectsOnThreshold={updateProjectsOnThreshold}
                updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
              />
            }
          />
          <Route
            exact
            path="/comingsoon"
            element={
              <ComingSoon
                preOrderProjects={preOrderProjects}
                user={user}
                updateUserLikesOnLike={updateUserLikesOnLike}
                updateUserLikesOnUnlike={updateUserLikesOnUnlike}
                updatePostLikesOnLike={updateProjectPostLikesOnLike}
                updatePostLikesOnUnlike={updateProjectPostLikesOnUnlike}
                updatePostCommentsOnComment={updateProjectPostCommentsOnComment}
                updatePostCommentsOnDelete={
                  updateProjectPostCommentsOnDeletedComment
                }
                updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
                updateProjectsOnThreshold={updateProjectsOnThreshold}
              />
            }
          />
          <Route
            exact
            path="/marketplace"
            element={<Marketplace products={products} />}
          />
          <Route
            exact
            path="/product/:id"
            element={
              <Product
                user={user}
                currentOrder={currentOrder}
                setCurrentOrder={putCurrentOrder}
                updateCurrentOrder={updateCurrentOrder}
              />
            }
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
              <ProductionUpdateForm
                user={user}
                updateUserProjectProductionUpdates={
                  updateUserProjectProductionUpdates
                }
                updateProjectsOnProductionUpdate={
                  updateProjectsOnProductionUpdate
                }
                updateProjectsOnProductionComplete={
                  updateProjectsOnProductionComplete
                }
                updateUserProjectsOnProductionComplete={
                  updateUserProjectsOnProductionComplete
                }
              />
            }
          />
          <Route
            exact
            path="/newproduct"
            element={
              <ListAProduct
                user={user}
                updateProductsOnNewListing={updateProductsOnNewListing}
              />
            }
          />
          <Route
            exact
            path="/u/:id"
            element={
              <Account
                user={user}
                updateUserOnEdit={updateUserOnEdit}
                updateUserLikesOnLike={updateUserLikesOnLike}
                updateUserLikesOnUnlike={updateUserLikesOnUnlike}
                updateProjectPostLikesOnLike={updateProjectPostLikesOnLike}
                updateProjectPostLikesOnUnlike={updateProjectPostLikesOnUnlike}
                updateProjectPostCommentsOnComment={
                  updateProjectPostCommentsOnComment
                }
                updateProjectPostCommentsOnDeletedComment={
                  updateProjectPostCommentsOnDeletedComment
                }
                updatePostLikesOnLike={updatePostLikesOnLike}
                updatePostLikesOnUnlike={updatePostLikesOnUnlike}
                updatePostCommentsOnComment={updatePostCommentsOnComment}
                updatePostCommentsOnDelete={updatePostCommentsOnDelete}
                updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
                updateProjectsOnThreshold={updateProjectsOnThreshold}
                updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                user={user}
                putCurrentOrder={putCurrentOrder}
                currentOrder={currentOrder}
              />
            }
          />
        </Routes>
      </div>
      <Footer user={user} logout={logout} currentOrder={currentOrder} />
    </div>
  );
}

export default App;
