import React from "react";
import Post from "./Post";

function Feed({
  posts,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
}) {
  //   console.log(posts[0].files[0].url);
  const postCards = posts.map((post) => (
    <Post
      post={post}
      key={post.id}
      user={user}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
    />
  ));
  return <div>Feed{postCards}</div>;
}

export default Feed;
