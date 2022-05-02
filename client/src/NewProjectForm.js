import React, { useState } from "react";

function NewProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [likes_threshold, setLikesThreshold] = useState("");
  const status = "New Project";

  return (
    <div>
      NewProjectForm
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          autoComplete="off"
          rows="10"
          cols="75"
          placeholder="Tell us about your new project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <div>
          <label htmlFor="likes_threshold">Likes Threshold:</label>
          <span
            style={{
              border: "1px solid grey",
              color: "grey",
              borderRadius: 10,
              width: 10,
              textAlign: "center",
              margin: 5,
            }}
          >
            The average number of likes per post for this project to be sent to
            production
          </span>
        </div>
        <input
          type="number"
          id="title"
          autoComplete="off"
          value={likes_threshold}
          min="1"
          max="100000000"
          onChange={(e) => setLikesThreshold(e.target.value)}
        />
        <br />
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          autoComplete="off"
          value={status}
          readonly
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default NewProjectForm;
