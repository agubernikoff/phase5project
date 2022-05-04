import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost({ user, updateUserProjectsPosts }) {
  const [project_id, setProjectId] = useState(user.projects[0].id);
  const [media, setMedia] = useState("");
  const [caption, setCaption] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("project_id", project_id);
  formData.append("media", media);
  formData.append("caption", caption);

  function handleSubmit(e) {
    e.preventDefault();
    if (!media) setErrors(["Please upload photos or videos"]);
    else if (media.length > 10)
      setErrors(["Too many files. Maximum allowed is 10"]);
    else {
      fetch("/posts", {
        method: "POST",
        body: formData,
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            updateUserProjectsPosts(data);
            navigate("/");
          });
        } else {
          r.json().then((data) => setErrors(data.errors));
        }
      });
    }
  }

  const projectOptions = user.projects.map((p) => (
    <option key={p.title} value={p.id}>
      {p.title}
    </option>
  ));

  function seperateFiles(filelist) {
    const array = [];
    for (let i = 0; i < filelist.length; i++) {
      array.push(filelist[i]);
    }
    setMedia(array);
  }

  return (
    <div>
      NewPost
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <label>Choose a project to post to:</label>
        <select onChange={(e) => setProjectId(parseInt(e.target.value))}>
          {projectOptions}
        </select>
        <br />
        <label htmlFor="media">Upload photos or videos:</label>
        <input
          type="file"
          accept=".jpeg,.png,.gif,.mov,.mp4"
          name="media"
          multiple
          onChange={(e) => seperateFiles(e.target.files)}
        ></input>
        <br />
        <label htmlFor="caption">Caption:</label>
        <textarea
          type="text"
          id="description"
          autoComplete="off"
          rows="10"
          cols="75"
          //   placeholder="Tell us about your new project"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
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

export default NewPost;
