import React, { useState, useEffect } from "react";
import Preorder from "./Preorder";

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
  const [mostPopular, setMostPopular] = useState([]);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

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
  const arrayOfArraysOfURLs = mostPopular.map((p) =>
    p.posts.map((p) => p.files.map((f) => f.url))
  );

  const previews = [];
  for (let i = 0; i < arrayOfArraysOfURLs.length; i++) {
    // get the size of the inner array
    var innerArrayLength = arrayOfArraysOfURLs[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
      var innermostArrayLength = arrayOfArraysOfURLs[i][j].length;

      for (let k = 0; k < innermostArrayLength; k++)
        previews.push(arrayOfArraysOfURLs[i][j][k]);
    }
  }
  const middle = Math.floor(previews.length / 2);
  const firstHalf = previews.slice(0, middle);
  const secondHalf = previews.slice(middle);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (index1 > -1 && index1 < firstHalf.length - 1)
        setIndex1(Math.floor(Math.random() * (firstHalf.length - 1)));
      else if (index1 === firstHalf.length - 1) setIndex1(0);
    }, 2000);
    let timer2 = setTimeout(() => {
      if (index2 > -1 && index2 < secondHalf.length - 1)
        setIndex2(Math.floor(Math.random() * (secondHalf.length - 1)));
      else if (index2 === secondHalf.length - 1) setIndex2(0);
    }, 2000);
    return function cleanup() {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  });
  console.log(index1);
  return (
    <div>
      <p style={{ textAlign: "center" }}>HOME</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "50%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={firstHalf[index1]}
            alt={"most popular"}
            style={{ width: "100%" }}
          />
        </div>
        <div
          style={{
            width: "50%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={secondHalf[index2]}
            alt={"most popular"}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <p>
        <strong>MOST POPULAR PROJECTS:</strong>
      </p>
      {mappedProjects}
    </div>
  );
}

export default Home;
