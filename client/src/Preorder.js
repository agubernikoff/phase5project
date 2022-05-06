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
        <p>STATUS: </p>
        <p>ETA:</p>
        <img
          src={project.posts[0].user_profile_picture}
          alt={`${project.posts[0].username}`}
          style={{ width: "5%", borderRadius: 20 }}
        />
        <strong> {project.posts[0].username}</strong>
        <span>: {project.title}</span>
      </div>
      {content}
      {project.description ? <p>project.description </p> : null}
      <button>PREORDER</button>
    </div>
  );
}

export default Preorder;
