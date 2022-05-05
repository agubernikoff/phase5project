import React from "react";
import Post from "./Post";

function Feed({ posts }) {
  console.log(posts[0].files[0].url);
  const postCards = posts.map((post) => <Post post={post} key={post.id} />);
  return <div>Feed{postCards}</div>;
}

export default Feed;
