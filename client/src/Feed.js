import React from "react";

function Feed({ posts }) {
  console.log(posts[0].files[0].url);
  return (
    <div>
      Feed
      <img src={posts[0].files[0].url} />
    </div>
  );
}

export default Feed;
