import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProjectForm({ user, updateUserProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [likes_threshold, setLikesThreshold] = useState("");
  const status = "New Project";
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("user_id", user.id);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("likes_threshold", likes_threshold);
  formData.append("status", status);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/projects", {
      method: "POST",
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateUserProjects(data);
          navigate("/");
        });
      } else {
        r.json().then((data) => setErrors(data.errors));
      }
    });
  }

  return (
    <div>
      NewProjectForm
      <form
        onSubmit={handleSubmit}
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
          <em
            style={{
              color: "grey",
              width: 10,
              textAlign: "center",
              margin: 5,
            }}
          >
            The average number of likes per post for this project to be sent to
            production
          </em>
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
          readOnly
        />
        <br />
        <button variant="fill" type="submit" style={{ marginTop: 10 }}>
          SUBMIT
        </button>
        {errors.map((err) => (
          <h3
            key={err}
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {err}
          </h3>
        ))}
      </form>
    </div>
  );
}

export default NewProjectForm;
