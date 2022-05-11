import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preorder from "./Preorder";
import Loading from "./Loading";

function Account({
  user,
  updateUserOnEdit,
  updateUserLikesOnLike,
  updateUserLikesOnUnlike,
  updateProjectPostLikesOnLike,
  updateProjectPostLikesOnUnlike,
  updateProjectPostCommentsOnComment,
  updateProjectPostCommentsOnDeletedComment,
  updatePostLikesOnLike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
  updateUserOnSelfLikeThreshold,
}) {
  const [accountHolder, setAccountHolder] = useState("");
  const [username, setUsername] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);
  const [editFormPicture, setEditFormPicture] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [displayOnly, setDisplayOnly] = useState(true);
  const [likedProjects, setLikedProjects] = useState([]);

  let { id } = useParams();
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setAccountHolder(data);
        setUsername(data.username);
        setBio(data.bio);
        setIsSeller(data.isSeller);
        setEditFormPicture(data.profile_picture);
        window.scrollTo(0, 0);
      });
    fetch(`/liked_projects/${id}`)
      .then((r) => r.json())
      .then((data) => setLikedProjects(data));
  }, [id]);

  function loopThroughAndFindPost(array, like) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
      if (array[i].find((p) => p.id === like.post_id))
        return array[i].find((p) => p.id === like.post_id);
    }
  }

  function updateAccountHolderOnLike(newLike) {
    const posts = accountHolder.projects.map((p) => p.posts);
    console.log(posts);
    const post = loopThroughAndFindPost(posts, newLike);
    const updatedPost = { ...post, likes: [...post.likes, newLike] };
    const project = accountHolder.projects.find(
      (p) => p.id === updatedPost.project_id
    );
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = accountHolder.projects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setAccountHolder({ ...accountHolder, projects: sortedProjects });
  }

  function updateAccountHolderOnUnLike(unLike) {
    const posts = accountHolder.projects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, unLike);
    const updatedPost = {
      ...post,
      likes: post.likes.filter((l) => l.id !== unLike.id),
    };
    const project = accountHolder.projects.find(
      (p) => p.id === updatedPost.project_id
    );
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = accountHolder.projects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setAccountHolder({ ...accountHolder, projects: sortedProjects });
  }

  function updateAccountHolderOnComment(newComment) {
    const posts = accountHolder.projects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, newComment);
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    const project = accountHolder.projects.find(
      (p) => p.id === updatedPost.project_id
    );
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = accountHolder.projects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setAccountHolder({ ...accountHolder, projects: sortedProjects });
  }

  function updateAccountHolderOnDeleteComment(deletedComment) {
    const posts = accountHolder.projects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, deletedComment);
    const updatedPost = {
      ...post,
      comments: post.comments.filter((l) => l.id !== deletedComment.id),
    };
    const project = accountHolder.projects.find(
      (p) => p.id === updatedPost.project_id
    );
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = accountHolder.projects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setAccountHolder({ ...accountHolder, projects: sortedProjects });
  }

  const newProjects = accountHolder.projects
    ? accountHolder.projects.filter((p) => p.status === "New Project")
    : [];

  const comingSoonProjects = accountHolder.projects
    ? accountHolder.projects.filter((p) => p.status === "Preorder")
    : [];

  const forSaleProjects = accountHolder.projects
    ? accountHolder.projects.filter((p) => p.status === "For Sale")
    : [];

  console.log(newProjects, comingSoonProjects, forSaleProjects);

  const mappedNewProjects = accountHolder.projects
    ? newProjects.map((p) => (
        <Preorder
          key={p.id}
          user={user}
          project={p}
          updateUserLikesOnLike={updateUserLikesOnLike}
          updateUserLikesOnUnlike={updateUserLikesOnUnlike}
          updatePostLikesOnLike={updatePostLikesOnLike}
          updatePostLikesOnUnlike={updatePostLikesOnUnlike}
          updatePostCommentsOnComment={updatePostCommentsOnComment}
          updatePostCommentsOnDelete={updatePostCommentsOnDelete}
          updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
          updateProjectsOnThreshold={updateProjectsOnThreshold}
          updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
          accountHolder={accountHolder}
          updateAccountOnLike={updateAccountHolderOnLike}
          updateAccountOnUnLike={updateAccountHolderOnUnLike}
          updateAccountOnComment={updateAccountHolderOnComment}
          updateAccountOnDeleteComment={updateAccountHolderOnDeleteComment}
        />
      ))
    : null;

  const mappedComingSoonProjects = accountHolder.projects
    ? comingSoonProjects.map((p) => (
        <Preorder
          key={p.id}
          user={user}
          project={p}
          updateUserLikesOnLike={updateUserLikesOnLike}
          updateUserLikesOnUnlike={updateUserLikesOnUnlike}
          updatePostLikesOnLike={updateProjectPostLikesOnLike}
          updatePostLikesOnUnlike={updateProjectPostLikesOnUnlike}
          updatePostCommentsOnComment={updateProjectPostCommentsOnComment}
          updatePostCommentsOnDelete={updateProjectPostCommentsOnDeletedComment}
          updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
          updateProjectsOnThreshold={updateProjectsOnThreshold}
          accountHolder={accountHolder}
          updateAccountOnLike={updateAccountHolderOnLike}
          updateAccountOnUnLike={updateAccountHolderOnUnLike}
          updateAccountOnComment={updateAccountHolderOnComment}
          updateAccountOnDeleteComment={updateAccountHolderOnDeleteComment}
        />
      ))
    : null;

  const mappedForSaleProjects = accountHolder.projects
    ? forSaleProjects.map((p) => (
        <Preorder
          key={p.id}
          user={user}
          project={p}
          updateUserLikesOnLike={updateUserLikesOnLike}
          updateUserLikesOnUnlike={updateUserLikesOnUnlike}
          updatePostLikesOnLike={updatePostLikesOnLike}
          updatePostLikesOnUnlike={updatePostLikesOnUnlike}
          updatePostCommentsOnComment={updatePostCommentsOnComment}
          updatePostCommentsOnDelete={updatePostCommentsOnDelete}
          updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
          updateProjectsOnThreshold={updateProjectsOnThreshold}
          updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
          accountHolder={accountHolder}
          updateAccountOnLike={updateAccountHolderOnLike}
          updateAccountOnUnLike={updateAccountHolderOnUnLike}
          updateAccountOnComment={updateAccountHolderOnComment}
          updateAccountOnDeleteComment={updateAccountHolderOnDeleteComment}
        />
      ))
    : null;

  const mappedProjects = accountHolder.projects
    ? [
        ...mappedNewProjects,
        ...mappedComingSoonProjects,
        ...mappedForSaleProjects,
      ].sort((a, b) => a.key - b.key)
    : null;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("isSeller", isSeller);
  if (profile_picture) formData.append("profile_picture", profile_picture);
  formData.append("bio", bio);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/me", {
      method: "PATCH",
      body: formData,
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setAccountHolder(user);
          updateUserOnEdit(user);
          setDisplayOnly(true);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  function updateLikedProjectsOnLike(newLike) {
    const posts = likedProjects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, newLike);
    const updatedPost = { ...post, likes: [...post.likes, newLike] };
    const project = likedProjects.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = likedProjects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setLikedProjects(sortedProjects);
  }
  function updateLikedProjectsOnUnLike(unLike) {
    const posts = likedProjects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, unLike);
    const updatedPost = {
      ...post,
      likes: post.likes.filter((l) => l.id !== unLike.id),
    };
    const project = likedProjects.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = likedProjects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setLikedProjects(sortedProjects);
  }
  function updateLikedProjectsOnComment(newComment) {
    const posts = likedProjects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, newComment);
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    const project = likedProjects.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = likedProjects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setLikedProjects(sortedProjects);
  }
  function updateLikedProjectsOnDeleteComment(deletedComment) {
    const posts = likedProjects.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, deletedComment);
    const updatedPost = {
      ...post,
      comments: post.comments.filter((l) => l.id !== deletedComment.id),
    };
    const project = likedProjects.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = likedProjects.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort((a, b) => a.id - b.id);
    setLikedProjects(sortedProjects);
  }

  const likedNewProjects = likedProjects
    ? likedProjects.filter((p) => p.status === "New Project")
    : [];

  const likedComingSoonProjects = likedProjects
    ? likedProjects.filter((p) => p.status === "Preorder")
    : [];
  const likedForSaleProjects = likedProjects
    ? likedProjects.filter((p) => p.status === "For Sale")
    : [];
  console.log(likedNewProjects, likedComingSoonProjects, likedForSaleProjects);
  const newProjectsImFollowing = likedNewProjects.map((p) => (
    <Preorder
      key={p.id}
      user={user}
      project={p}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
      updatePostCommentsOnComment={updatePostCommentsOnComment}
      updatePostCommentsOnDelete={updatePostCommentsOnDelete}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
      updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
      accountHolder={accountHolder}
      updateAccountOnLike={updateLikedProjectsOnLike}
      updateAccountOnUnLike={updateLikedProjectsOnUnLike}
      updateAccountOnComment={updateLikedProjectsOnComment}
      updateAccountOnDeleteComment={updateLikedProjectsOnDeleteComment}
    />
  ));

  const comingSoonProjectsImFollowing = likedComingSoonProjects.map((p) => (
    <Preorder
      key={p.id}
      user={user}
      project={p}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updateProjectPostLikesOnLike}
      updatePostLikesOnUnlike={updateProjectPostLikesOnUnlike}
      updatePostCommentsOnComment={updateProjectPostCommentsOnComment}
      updatePostCommentsOnDelete={updateProjectPostCommentsOnDeletedComment}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
      accountHolder={accountHolder}
      updateAccountOnLike={updateLikedProjectsOnLike}
      updateAccountOnUnLike={updateLikedProjectsOnUnLike}
      updateAccountOnComment={updateLikedProjectsOnComment}
      updateAccountOnDeleteComment={updateLikedProjectsOnDeleteComment}
    />
  ));

  const forSaleProjectsImFollowing = likedForSaleProjects.map((p) => (
    <Preorder
      key={p.id}
      user={user}
      project={p}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
      updatePostCommentsOnComment={updatePostCommentsOnComment}
      updatePostCommentsOnDelete={updatePostCommentsOnDelete}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
      updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
      accountHolder={accountHolder}
      updateAccountOnLike={updateLikedProjectsOnLike}
      updateAccountOnUnLike={updateLikedProjectsOnUnLike}
      updateAccountOnComment={updateLikedProjectsOnComment}
      updateAccountOnDeleteComment={updateLikedProjectsOnDeleteComment}
    />
  ));

  const mappedProjectsImFollowing = [
    ...newProjectsImFollowing,
    ...comingSoonProjectsImFollowing,
    ...forSaleProjectsImFollowing,
  ].sort((a, b) => a.key - b.key);

  return (
    <div>
      {accountHolder ? null : <Loading />}
      {accountHolder.id === user.id ? (
        <button
          onClick={() => setDisplayOnly(!displayOnly)}
          style={{ float: "right" }}
        >
          {displayOnly ? "EDIT PROFILE" : "CANCEL"}
        </button>
      ) : null}
      <br />
      {displayOnly ? (
        <>
          <img
            alt={accountHolder.username}
            src={accountHolder.profile_picture}
            style={{ width: "10%", borderRadius: 50 }}
          />
          <span style={{ fontSize: 108 }}>{accountHolder.username} </span>
          {accountHolder.bio ? (
            <p>
              <strong>BIO: </strong>
              {accountHolder.bio}
            </p>
          ) : null}
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                marginRight: 0,
                marginBottom: 10,
                width: "135px",
              }}
            >
              <img
                alt={accountHolder.username}
                src={editFormPicture}
                style={{
                  width: "95%",
                  borderRadius: 60,
                  display: "inline-block",
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  document.getElementById("getFile").click();
                }}
                style={{
                  width: "fit-content",
                  display: "block",
                  margin: "auto",
                }}
              >
                Edit
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 0,
              }}
            >
              <input
                id="getFile"
                type="file"
                accept="image/jpeg,image/png"
                name="profile_picture"
                style={{ display: "none" }}
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                  setEditFormPicture(URL.createObjectURL(e.target.files[0]));
                }}
              ></input>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                placeholder={username}
                style={{
                  fontSize: 108,
                  display: "inline-block",
                  width: "99%",
                }}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 10, display: "flex" }}>
            <label htmlFor="caption">
              <strong>BIO: </strong>
            </label>
            <textarea
              type="text"
              id="description"
              autoComplete="off"
              rows="10"
              cols="105"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          {isSeller ? null : (
            <button
              onClick={() => setIsSeller(true)}
              style={{ display: "block", width: "fit-content", margin: "auto" }}
            >
              BECOME A SELLER
            </button>
          )}
          <button
            type="submit"
            style={{ margin: "auto", marginTop: 10, width: "fit-content" }}
          >
            {isLoading ? <Loading /> : "EDIT PROFILE"}
          </button>
          {errors.map((err) => (
            <h3
              key={err}
              style={{
                display: "block",
                margin: "auto",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              {err}
            </h3>
          ))}
        </form>
      )}
      {accountHolder.isSeller && accountHolder.projects[0] ? (
        <div>
          <strong>MY PROJECTS:</strong> {mappedProjects}
        </div>
      ) : null}
      {accountHolder ? (
        <div>
          <strong>PROJECTS I'M INTERESTED IN:</strong>
          {mappedProjectsImFollowing}
        </div>
      ) : null}
    </div>
  );
}

export default Account;
