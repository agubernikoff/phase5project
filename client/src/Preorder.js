import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Post from "./Post";
import Update from "./Update";
import ProductPreview from "./ProductPreview";

function Preorder({
  project,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
  accountHolder,
  updateAccountOnLike,
  updateAccountOnUnLike,
  updateAccountOnComment,
  updateAccountOnDeleteComment,
}) {
  const [viewHistory, setViewHistory] = useState(false);
  function toggleHistory() {
    setViewHistory(!viewHistory);
  }
  const content = project.posts.map((post) => (
    <Post
      key={post.id}
      post={post}
      user={user}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
      updatePostCommentsOnComment={updatePostCommentsOnComment}
      updatePostCommentsOnDelete={updatePostCommentsOnDelete}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
      accountHolder={accountHolder}
      updateAccountOnLike={updateAccountOnLike}
      updateAccountOnUnLike={updateAccountOnUnLike}
      updateAccountOnComment={updateAccountOnComment}
      updateAccountOnDeleteComment={updateAccountOnDeleteComment}
    />
  ));

  const updates = project.production_updates.map((update) => (
    <Update update={update} key={update.id} />
  ));

  const productPreviews = project.products.map((p) => (
    <ProductPreview key={p.id} product={p} />
  ));

  return (
    <div>
      <div style={{ width: "fit-content" }}>
        <br />
        <img
          src={project.posts[0].user_profile_picture}
          alt={`${project.posts[0].username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <NavLink to={`/u/${project.user_id}`}>
          {" "}
          {project.posts[0].username}
        </NavLink>
        <span>: {project.title}</span>
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "50%",
          display: "block",
          margin: "auto",
        }}
      >
        <span>
          STATUS:{" "}
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .status
            : project.status}
        </span>
        <span style={{ float: "right" }}>
          ETA:{" "}
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .ETA
            : "N/A"}
        </span>
        {project.description ? (
          <p>PROJECT DESCRIPTION: {project.description}</p>
        ) : null}
        <p style={{ marginBottom: 0 }}>POSTS:</p>
        {content}
        {project.production_updates[0] ? (
          <div>
            {viewHistory ? (
              updates
            ) : (
              <Update
                update={
                  project.production_updates[
                    project.production_updates.length - 1
                  ]
                }
              />
            )}
            <button
              onClick={toggleHistory}
              style={{
                border: "1px solid black",
                borderRadius: 20,
                backgroundColor: "white",
                color: "grey",
                display: "block",
                margin: "auto",
                position: "relative",
                bottom: 11,
              }}
            >
              {viewHistory ? "SHOW LESS" : "VIEW HISTORY"}
            </button>
          </div>
        ) : project.user_id === user.id ? (
          "No updates yet. Please add an update."
        ) : (
          "No updates yet. Please check back later"
        )}
        {project.products[0] ? (
          <div
            style={{ margin: "auto", display: "flex", width: "fit-content" }}
          >
            {productPreviews}
          </div>
        ) : null}
        {project.status === "Preorder" ? (
          <button
            style={{
              margin: "auto",
              marginTop: 5,
              marginBottom: 5,
              display: "block",
            }}
          >
            PREORDER
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Preorder;
