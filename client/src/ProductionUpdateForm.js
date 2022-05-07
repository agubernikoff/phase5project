import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ProductionUpdateForm({
  user,
  updateUserProjectProductionUpdates,
  updateProjects,
}) {
  const preorderProjects = user.projects.filter(
    (project) => project.status === "Preorder"
  );
  const [project_id, setProjectId] = useState(preorderProjects[0].id);
  const selectedProject = preorderProjects.filter((p) => p.id === project_id);
  const [ETA, setETA] = useState(
    selectedProject[0].production_updates[0]
      ? selectedProject[0].production_updates[
          selectedProject[0].production_updates.length - 1
        ].ETA
      : ""
  );
  const [status, setStatus] = useState("On Schedule");
  const [caption, setCaption] = useState([]);
  const [files, setFiles] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("project_id", project_id);
  formData.append("caption", caption);
  formData.append("ETA", ETA);
  formData.append("status", status);
  for (let i = 0; i < files.length; i++) {
    formData.append("images[]", files[i]);
  }
  const dateRegex =
    /^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/;

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (files.length > 10) {
      setErrors(["Too many files. Maximum allowed is 10"]);
      setIsLoading(false);
    } else if (!dateRegex.test(ETA)) {
      setErrors(["Please enter a valid date"]);
      setIsLoading(false);
    } else {
      fetch("/production_updates", {
        method: "POST",
        body: formData,
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            updateUserProjectProductionUpdates(data);
            updateProjects(data);
            navigate("/");
          });
        } else {
          r.json().then((data) => {
            setErrors(data.errors);
            setIsLoading(false);
          });
        }
      });
    }
  }

  const projectOptions = preorderProjects.map((p) => (
    <option key={p.title} value={p.id}>
      {p.title}
    </option>
  ));

  const statusOptions = ["On Schedule", "Delayed"].map((a) => (
    <option key={a} value={a}>
      {a}
    </option>
  ));

  return (
    <div>
      ProductionUpdate
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
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statusOptions}
        </select>
        <br />
        {selectedProject[0].production_updates[0] &&
        status === "On Schedule" ? (
          <>
            <label htmlFor="username">
              When will your product be available to purchase?
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={ETA}
              placeholder="MM/DD/YYYY"
              readOnly
              onChange={(e) => setETA(e.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="username">
              When will your product be available to purchase?
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={ETA}
              placeholder="MM/DD/YYYY"
              onChange={(e) => setETA(e.target.value)}
            />
          </>
        )}
        <br />
        <label htmlFor="files">Upload photos or videos:</label>
        <input
          type="file"
          accept=".jpeg,.png,.gif,.mov,.mp4"
          name="files"
          multiple
          onChange={(e) => setFiles(e.target.files)}
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
        <button variant="fill" type="submit" style={{ marginTop: 10 }}>
          {isLoading ? <Loading /> : "SUBMIT"}
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

export default ProductionUpdateForm;
