import React, { useState } from "react";
import Update from "./Update";

function Preorder({ project, user }) {
  const [viewHistory, setViewHistory] = useState(false);
  function toggleHistory() {
    setViewHistory(!viewHistory);
  }

  const content = project.posts.map((post) =>
    post.files.map((file) => (
      <img
        key={file.url}
        src={file.url}
        alt={"content"}
        style={{ width: "50%", margin: "auto", margintop: 0, display: "block" }}
      />
    ))
  );

  const updates = project.production_updates.map((update) => (
    <Update update={update} key={update.id} />
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
        <strong> {project.posts[0].username}</strong>
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
            : "N/A"}
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
            <button onClick={toggleHistory}>
              {viewHistory ? "SHOW LESS" : "VIEW HISTORY"}
            </button>
          </div>
        ) : project.user_id === user.id ? (
          "No updates yet. Please add an update."
        ) : (
          "No updates yet. Please check back later"
        )}
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
      </div>
    </div>
  );
}

export default Preorder;
