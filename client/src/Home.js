import React, { useState, useEffect } from "react";
import Preorder from "./Preorder";
// import { useNavigate } from "react-router-dom";

function Home({
  logout,
  user,
  updateUserLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnLike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
  updateUserOnSelfLikeThreshold,
  updateProjectPostLikesOnLike,
  updateProjectPostLikesOnUnlike,
  updateProjectPostCommentsOnComment,
  updateProjectPostCommentsOnDeletedComment,
}) {
  // const navigate = useNavigate();
  const [mostPopular, setMostPopular] = useState([]);

  function calculateAvgLikes(project) {
    return (
      project.posts
        .map((p) => p.likes.length)
        .reduce((partialSum, a) => partialSum + a, 0) / project.posts.length
    );
  }

  useEffect(() => {
    fetch("/most_popular_projects")
      .then((r) => r.json())
      .then((data) => setMostPopular(data));
  }, []);

  function loopThroughAndFindPost(array, like) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
      if (array[i].find((p) => p.id === like.post_id))
        return array[i].find((p) => p.id === like.post_id);
    }
  }

  function updateMostPopularOnLike(newLike) {
    const posts = mostPopular.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, newLike);
    const updatedPost = { ...post, likes: [...post.likes, newLike] };
    const project = mostPopular.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = mostPopular.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort(
      (a, b) => calculateAvgLikes(b) - calculateAvgLikes(a)
    );
    setMostPopular(sortedProjects);
  }

  function updateMostPopularOnUnLike(unLike) {
    const posts = mostPopular.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, unLike);
    const updatedPost = {
      ...post,
      likes: post.likes.filter((l) => l.id !== unLike.id),
    };
    const project = mostPopular.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = mostPopular.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort(
      (a, b) => calculateAvgLikes(b) - calculateAvgLikes(a)
    );
    setMostPopular(sortedProjects);
  }

  function updateMostPopularOnComment(newComment) {
    const posts = mostPopular.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, newComment);
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    const project = mostPopular.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = mostPopular.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort(
      (a, b) => calculateAvgLikes(b) - calculateAvgLikes(a)
    );
    setMostPopular(sortedProjects);
  }

  function updateMostPopularOnDeleteComment(deletedComment) {
    const posts = mostPopular.map((p) => p.posts);
    const post = loopThroughAndFindPost(posts, deletedComment);
    const updatedPost = {
      ...post,
      comments: post.comments.filter((l) => l.id !== deletedComment.id),
    };
    const project = mostPopular.find((p) => p.id === updatedPost.project_id);
    const filteredPosts = project.posts.filter((p) => p.id !== updatedPost.id);
    const updatedPosts = [...filteredPosts, updatedPost];
    const sortedPosts = updatedPosts.sort((a, b) => a.id - b.id);
    const updatedProject = { ...project, posts: sortedPosts };
    const filteredProjects = mostPopular.filter(
      (p) => p.id !== updatedProject.id
    );
    const updatedProjects = [...filteredProjects, updatedProject];
    const sortedProjects = updatedProjects.sort(
      (a, b) => calculateAvgLikes(b) - calculateAvgLikes(a)
    );
    setMostPopular(sortedProjects);
  }

  const mappedProjects = mostPopular.map((p) =>
    p.status === "New Project" ? (
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
        accountHolder={true}
        updateAccountOnLike={updateMostPopularOnLike}
        updateAccountOnUnLike={updateMostPopularOnUnLike}
        updateAccountOnComment={updateMostPopularOnComment}
        updateAccountOnDeleteComment={updateMostPopularOnDeleteComment}
      />
    ) : p.status === "Preorder" ? (
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
        updateUserOnSelfLikeThreshold={updateUserOnSelfLikeThreshold}
        accountHolder={true}
        updateAccountOnLike={updateMostPopularOnLike}
        updateAccountOnUnLike={updateMostPopularOnUnLike}
        updateAccountOnComment={updateMostPopularOnComment}
        updateAccountOnDeleteComment={updateMostPopularOnDeleteComment}
      />
    ) : (
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
        accountHolder={true}
        updateAccountOnLike={updateMostPopularOnLike}
        updateAccountOnUnLike={updateMostPopularOnUnLike}
        updateAccountOnComment={updateMostPopularOnComment}
        updateAccountOnDeleteComment={updateMostPopularOnDeleteComment}
      />
    )
  );
  return (
    <div>
      <p style={{ textAlign: "center" }}>HOME</p>
      {/* IDK SOMETHING */}
      <p>
        <strong>MOST POPULAR PROJECTS:</strong>
      </p>
      {mappedProjects}
    </div>
  );
}

export default Home;
