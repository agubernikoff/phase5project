import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ProductionUpdateForm({
  user,
  updateUserProjectProductionUpdates,
  updateProjectsOnProductionUpdate,
  updateProjectsOnProductionComplete,
  updateUserProjectsOnProductionComplete,
}) {
  const navigate = useNavigate();
  const preorderProjects = user.projects.filter(
    (project) => project.status === "Preorder"
  );
  if (!preorderProjects) navigate("/");
  const [project_id, setProjectId] = useState(
    preorderProjects[0] ? preorderProjects[0].id : null
  );
  const selectedProject = preorderProjects.find(
    (p) => p.id === preorderProjects[0].id
  );
  const [ETA, setETA] = useState(
    selectedProject && selectedProject.production_updates.length > 0
      ? selectedProject.production_updates[
          selectedProject.production_updates.length - 1
        ].ETA
      : ""
  );
  const [status, setStatus] = useState("On Schedule");
  const [caption, setCaption] = useState([]);
  const [files, setFiles] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            updateProjectsOnProductionUpdate(data);
            if (status === "Completed") {
              updateProjectsOnProductionComplete(data);
              updateUserProjectsOnProductionComplete(data);
              navigate("/newproduct");
            } else navigate("/");
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

  const statusOptions = ["On Schedule", "Delayed", "Completed"].map((a) => (
    <option key={a} value={a}>
      {a}
    </option>
  ));

  function updateETA(id) {
    const project = user.projects.find((p) => p.id === id);
    setETA(
      project.production_updates[0]
        ? project.production_updates[project.production_updates.length - 1].ETA
        : ""
    );
  }

  return (
    <div>
      ProductionUpdate
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        <label>Choose a project to post to:</label>
        <select
          onChange={(e) => {
            setProjectId(parseInt(e.target.value));
            updateETA(parseInt(e.target.value));
          }}
        >
          {projectOptions}
        </select>
        <br />
        <label>*Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statusOptions}
        </select>
        <br />
        {selectedProject &&
        selectedProject.production_updates[0] &&
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
          placeholder="Tell us how production of your project is going"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <br />
        <button variant="fill" type="submit" style={{ marginTop: 10 }}>
          {isLoading ? <Loading /> : "SUBMIT"}
        </button>
        {status === "Completed" ? (
          <h3
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            * This action will move your Project to MARKETPLACE. You will be
            prompted to upload a product listing.
          </h3>
        ) : (
          errors.map((err) => (
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
          ))
        )}
      </form>
    </div>
  );
}

export default ProductionUpdateForm;
