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
  updateProjectsOnPreorder,
  updateProjectsOnPreorder2,
}) {
  const [viewHistory, setViewHistory] = useState(false);
  const [error, setError] = useState("");
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

  const productPreviews = project.products[0]
    ? project.products.map((p) => <ProductPreview key={p.id} product={p} />)
    : null;
  const inputEl = useRef(null);
  const inputEl2 = useRef(null);
  const prev = "<";
  const next = ">";

  function handlePreorder() {
    fetch("/preorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, project_id: project.id }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateProjectsOnPreorder(data);
          if (accountHolder) updateProjectsOnPreorder2(data);
        });
      } else {
        r.json().then((data) => {
          if (data.error[0].includes("UNAUTHORIZED")) setError(data.error);
        });
      }
    });
  }
  console.log(project.production_updates[2].status);

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
        <span
          style={
            project.production_updates[0] && project.status === "Preorder"
              ? project.production_updates[
                  project.production_updates.length - 1
                ].status === "On Schedule"
                ? {
                    color: "green",
                  }
                : {
                    color: "red",
                  }
              : {
                  color: "black",
                }
          }
        >
          <strong style={{ color: "black" }}>STATUS: </strong>
          {project.production_updates[0] && project.status === "Preorder"
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
                backgroundColor: "white",
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
        {project.status === "Preorder" && !error ? (
          <button
            style={
              project.preorders.map((p) => p.user_id).includes(user.id)
                ? {
                    margin: "auto",
                    marginTop: 5,
                    marginBottom: 5,
                    display: "block",
                    background: "green",
                    color: "white",
                  }
                : {
                    margin: "auto",
                    marginTop: 5,
                    marginBottom: 5,
                    display: "block",
                  }
            }
            onClick={handlePreorder}
          >
            {project.preorders.map((p) => p.user_id).includes(user.id)
              ? "PREORDERED"
              : project.preorders.length >= project.likes_threshold
              ? "SOLD OUT"
              : "PREORDER"}
          </button>
        ) : project.status === "Preorder" ? (
          <p
            style={{
              textAlign: "center",
              width: "95%",
              margin: "auto",
              marginBottom: "1vw",
            }}
          >
            <strong>{error[0]}</strong>
            {error[1] +
              error[2] +
              new Date(error[3])
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .toUpperCase() +
              " AT " +
              new Date(error[3]).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Preorder;
