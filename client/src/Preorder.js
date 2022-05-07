import React from "react";

function Preorder({ project }) {
  console.log(project);

  const content = project.posts.map((post) =>
    post.files.map((file) => (
      <img
        key={file.url}
        src={file.url}
        alt={"content"}
        style={{ width: "100%" }}
      />
    ))
  );

  const updates = project.production_updates.map((update) => (
    <div key={update.id}>update</div>
  ));
  return (
    <div
      style={{
        border: "1px solid black",
        width: "50%",
        display: "block",
        margin: "auto",
      }}
    >
      <div style={{ width: "fit-content" }}>
        <p>
          STATUS:{" "}
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .status
            : null}
        </p>
        <p>
          ETA:{" "}
          {project.production_updates[0]
            ? project.production_updates[project.production_updates.length - 1]
                .ETA
            : null}
        </p>
        <img
          src={project.posts[0].user_profile_picture}
          alt={`${project.posts[0].username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <strong> {project.posts[0].username}</strong>
        <span>: {project.title}</span>
      </div>
      {project.description ? <p>project.description </p> : null}
      <h5>POSTS:</h5>
      {content}
      {updates}
      <button>PREORDER</button>
    </div>
  );
}

export default Preorder;
