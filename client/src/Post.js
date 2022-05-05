import React from "react";

function Post({ post }) {
  console.log(post);
  const content = post.files.map((f) => (
    <img src={f.url} alt={"content"} key={f.url} style={{ width: "25%" }} />
  ));
  const comments =
    post.comments.length > 0
      ? post.comments.map((c) => <p>{c.comment}</p>)
      : "no comments yet";
  return (
    <div>
      <div>
        <img
          src={post.user_profile_picture}
          alt={`${post.username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <strong>{post.username}</strong>
        <span>
          {new Date(post.created_at).toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      {content}
      <br />
      <button>insert heart here for likes</button>
      <span>{`${post.likes.length} likes`}</span>
      <p>{post.caption}</p>
      {comments}
      <button>add a comment</button>
    </div>
  );
}

export default Post;
