import React from "react";
import heartIcon from "./assets/heartIcon.png";
import emptyHeartIcon from "./assets/emptyHeartIcon.png";

function Post({ post }) {
  console.log(post);
  const content = post.files.map((f) => (
    <img src={f.url} alt={"content"} key={f.url} style={{ width: "100%" }} />
  ));
  const comments =
    post.comments.length > 0
      ? post.comments.map((c) => <p>{c.comment}</p>)
      : "no comments yet";
  return (
    <div
      style={{
        display: "block",
        margin: "auto",
        width: 333,
        border: "solid 1px black",
      }}
    >
      <div style={{ width: "fit-content" }}>
        <img
          src={post.user_profile_picture}
          alt={`${post.username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <strong>{post.username}</strong>
        <span style={{ float: "right", color: "#807f7f" }}>
          {new Date(post.created_at).toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      <div style={{ overflow: "auto" }}>{content}</div>
      <br />
      <img src={emptyHeartIcon} alt={"like button"} style={{ width: "6%" }} />
      <span>{`${post.likes.length} likes`}</span>
      <p>{post.caption}</p>
      {comments}
      <button>add a comment</button>
    </div>
  );
}

export default Post;
