import React from "react";
import Post from "./Post";

function Feed({
  posts,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
}) {
  const postCards = posts.map((post) => (
    <Post
      post={post}
      key={post.id}
      user={user}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
      updatePostCommentsOnComment={updatePostCommentsOnComment}
      updatePostCommentsOnDelete={updatePostCommentsOnDelete}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
    />
  ));
  return <div>Feed{postCards}</div>;
}

export default Feed;
