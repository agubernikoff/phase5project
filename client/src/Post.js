import React, { useState } from "react";
import heartIcon from "./assets/heartIcon.png";
import emptyHeartIcon from "./assets/emptyHeartIcon.png";

function Post({
  post,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
}) {
  const [likeBtnClicked, setLikeBtnClicked] = useState(false);

  const content = post.files.map((f) => (
    <img src={f.url} alt={"content"} key={f.url} style={{ width: "100%" }} />
  ));

  const comments =
    post.comments.length > 0
      ? post.comments.map((c) => <p>{c.comment}</p>)
      : "no comments yet";

  function handleLikeClick(e) {
    console.log(e.target.src.includes("empty"));
    setLikeBtnClicked(!likeBtnClicked);
    if (e.target.src.includes("empty")) {
      fetch("/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, user_id: user.id }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            updateUserLikesOnLike(data);
            updatePostLikesOnLike(data);
          });
        } else r.json().then((data) => console.log(data));
      });
    } else {
      const like = user.likes.find((uL) => uL.post_id === post.id);
      fetch(`/likes/${like.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((r) => {
        if (r.ok) {
          updateUserLikesOnUnlike(like.id);
          updatePostLikesOnUnlike(like);
        } else r.json().then((data) => console.log(data));
      });
    }
  }
  console.log(post.id, user.likes);
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
      <img
        src={likeBtnClicked ? heartIcon : emptyHeartIcon}
        alt={"like button"}
        style={{ width: "6%" }}
        onClick={handleLikeClick}
      />
      <span>{`${post.likes.length} likes`}</span>
      <p>{post.caption}</p>
      {comments}
      <button>add a comment</button>
    </div>
  );
}

export default Post;
