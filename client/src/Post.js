import React from "react";

function Post({ post }) {
  console.log(post);
  return (
    <div>
      <strong>{post.username}</strong>
    </div>
  );
}

export default Post;
