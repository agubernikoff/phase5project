import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Post from "./Post";
import Update from "./Update";
import ProductPreview from "./ProductPreview";
import Carousel from "react-elastic-carousel";

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

  console.log(project.products);
  const productPreviews = project.products[0]
    ? project.products.map((p) => <ProductPreview key={p.id} product={p} />)
    : null;
  const inputEl = useRef(null);
  const inputEl2 = useRef(null);
  const prev = "<";
  const next = ">";

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
          <strong> {project.posts[0].username}</strong>
        </NavLink>
        <span>: {project.title}</span>
      </div>
      <div
        style={{
          border: "3px solid black",
          width: "50%",
          display: "block",
          margin: "auto",
        }}
      >
        <span>
          <strong>STATUS: </strong>
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .status
            : project.status}
        </span>
        <span style={{ float: "right" }}>
          <strong>ETA: </strong>
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .ETA
            : "N/A"}
        </span>
        {project.description ? (
          <p>PROJECT DESCRIPTION: {project.description}</p>
        ) : null}
        <p style={{ marginBottom: 0 }}>
          <strong>POSTS:</strong>
        </p>
        {project.posts.length > 1 ? (
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
            <br />
          </>
        ) : (
          content
        )}
        {project.production_updates[0] ? (
          <div>
            <strong>
              <p>UPDATES:</p>
            </strong>
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
          <p>No updates yet. Please add an update.</p>
        ) : (
          <p>No updates yet. Please check back later</p>
        )}
        {project.products[0] ? (
          project.products.length > 1 ? (
            <>
              <strong>
                <p>PRODUCTS:</p>
              </strong>
              <Carousel ref={inputEl2}>{productPreviews}</Carousel>
              <button
                className="prevbtn"
                onClick={() => inputEl2.current.slidePrev()}
              >
                {prev}
              </button>
              <button
                className="nextbtn"
                onClick={() => inputEl2.current.slideNext()}
              >
                {next}
              </button>
              <br />
            </>
          ) : (
            <>
              <strong>
                <p>PRODUCTS:</p>
              </strong>
              {productPreviews}
            </>
          )
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
