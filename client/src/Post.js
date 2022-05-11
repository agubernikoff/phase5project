import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import heartIcon from "./assets/heartIcon.png";
import emptyHeartIcon from "./assets/emptyHeartIcon.png";
import Carousel from "react-elastic-carousel";

function Post({
  post,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
  updateUserOnSelfLikeThreshold,
  accountHolder,
  updateAccountOnLike,
  updateAccountOnUnLike,
  updateAccountOnComment,
  updateAccountOnDeleteComment,
}) {
  const [comment, setComment] = useState("");
  const content = post.files.map((f) => (
    <img src={f.url} alt={"content"} key={f.url} style={{ width: "100%" }} />
  ));

  const comments =
    post.comments.length > 0
      ? post.comments.map((c) => (
          <div key={c.id} style={{ position: "relative" }}>
            <img
              src={c.commenter_profile_picture}
              alt={c.commenter_username}
              style={{ width: "5%", borderRadius: 20 }}
            />
            <span>
              <NavLink to={`/u/${c.user_id}`}>{c.commenter_username}: </NavLink>
              {c.comment}
            </span>
            {c.user_id === user.id ? (
              <button
                style={{ position: "absolute", right: 0 }}
                value={c.id}
                onClick={deleteComment}
              >
                x
              </button>
            ) : null}
          </div>
        ))
      : "NO COMMENTS YET...";

  function onLike() {
    fetch("/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id, user_id: user.id }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateUserLikesOnLike(data.like ? data.like : data);
          if (data.like) {
            updatePostsOnLikesThreshold(data);
            updateProjectsOnThreshold(data);
            updateUserOnSelfLikeThreshold(data);
          } else {
            updatePostLikesOnLike(data);
            if (accountHolder) updateAccountOnLike(data);
          }
        });
      } else r.json().then((data) => console.log(data));
    });
  }

  function onUnlike() {
    const like = user.likes.find((uL) => uL.post_id === post.id);
    fetch(`/likes/${like.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        updateUserLikesOnUnlike(like.id);
        updatePostLikesOnUnlike(like);
        if (accountHolder) updateAccountOnUnLike(like);
      } else r.json().then((data) => console.log(data));
    });
  }

  function handleLikeClick(e) {
    if (e.target.src.includes("empty")) {
      onLike();
    } else {
      onUnlike();
    }
  }
  const userLikesThisPost = user.likes.filter((uL) => uL.post_id === post.id);

  function newComment(e) {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: comment,
        post_id: post.id,
        user_id: user.id,
        commenter_username: user.username,
        commenter_profile_picture: user.profile_picture,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updatePostCommentsOnComment(data);
          if (accountHolder) updateAccountOnComment(data);
        });
      } else r.json().then((data) => console.log(data));
    });
    setComment("");
  }

  function deleteComment(e) {
    console.log(e.target.value);
    fetch(`/comments/${e.target.value}`, {
      method: "DELETE",
      headers: { "Content-Type": "appliation/json" },
    }).then((r) =>
      r.json().then((data) => {
        updatePostCommentsOnDelete(data);
        if (accountHolder) updateAccountOnDeleteComment(data);
      })
    );
  }

  const inputEl = useRef(null);
  const prev = "<";
  const next = ">";
  return (
    <div
      style={{
        display: "block",
        margin: "auto",
        width: "50%",
        border: "solid 1px black",
      }}
    >
      <div style={{ width: "fit-content" }}>
        <img
          src={post.user_profile_picture}
          alt={`${post.username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <NavLink to={`/u/${post.user_id}`}>
          <strong>{post.username}</strong>
        </NavLink>
        <span style={{ float: "right", color: "#807f7f" }}>
          {new Date(post.created_at)
            .toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
            .toUpperCase()}
        </span>
      </div>
      <div style={{ width: "100%" }}>
        {post.files.length > 1 ? (
          <>
            <Carousel ref={inputEl}>{content}</Carousel>
            <button
              className="prevbtn"
              onClick={() => inputEl.current.slidePrev()}
            >
              {prev}
            </button>
            <button
              className="nextbtn"
              onClick={() => inputEl.current.slideNext()}
            >
              {next}
            </button>
          </>
        ) : (
          content
        )}
      </div>
      <br />
      <img
        src={userLikesThisPost[0] ? heartIcon : emptyHeartIcon}
        alt={"like button"}
        style={{ width: "6%" }}
        onClick={handleLikeClick}
      />
      <span style={{ float: "right" }}>{`${post.likes.length} LIKES`}</span>
      {post.message ? post.message.map((pm) => <p key={pm}>{pm}</p>) : null}
      <p>{post.caption}</p>
      {comments}
      <br />
      <form onSubmit={newComment}>
        <input
          style={{ borderRadius: 10, border: "1px solid grey" }}
          placeholder="add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default Post;
