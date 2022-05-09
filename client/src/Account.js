import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preorder from "./Preorder";
import Loading from "./Loading";

function Account({ user }) {
  const [accountHolder, setAccountHolder] = useState("");
  const [username, setUsername] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [displayOnly, setDisplayOnly] = useState(true);

  let { id } = useParams();
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setAccountHolder(data);
        setUsername(data.username);
        setBio(data.bio);
        setProfilePicture(data.profile_picture);
      });
  }, [id]);
  console.log(accountHolder, profile_picture);

  const mappedProjects = accountHolder.projects
    ? accountHolder.projects.map((p) => (
        <Preorder key={p.id} user={user} project={p} />
      ))
    : null;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("isSeller", isSeller);
  formData.append("profile_picture", profile_picture);
  formData.append("bio", bio);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/me", {
      method: "PATCH",
      body: formData,
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          //   setAccountHolder(user);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      {accountHolder.id === user.id ? (
        <button onClick={() => setDisplayOnly(!displayOnly)}>
          {displayOnly ? "EDIT PROFILE" : "CANCEL"}
        </button>
      ) : null}
      <br />
      {displayOnly ? (
        <>
          <img
            alt={accountHolder.username}
            src={accountHolder.profile_picture}
            style={{ width: "10%", borderRadius: 50 }}
          />
          <span style={{ fontSize: 108 }}>{accountHolder.username} </span>
          {accountHolder.bio ? (
            <p>
              <strong>BIO: </strong>
              {accountHolder.bio}
            </p>
          ) : null}
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                marginRight: 0,
                marginBottom: 10,
                width: "135px",
              }}
            >
              <img
                alt={accountHolder.username}
                src={accountHolder.profile_picture}
                style={{
                  width: "95%",
                  borderRadius: 60,
                  display: "inline-block",
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  document.getElementById("getFile").click();
                }}
                style={{
                  width: "fit-content",
                  display: "block",
                  margin: "auto",
                }}
              >
                Edit
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 0,
              }}
            >
              <input
                id="getFile"
                type="file"
                accept="image/jpeg,image/png"
                name="profile_picture"
                style={{ display: "none" }}
                onChange={(e) => setProfilePicture(e.target.files[0])}
              ></input>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                placeholder={username}
                style={{ fontSize: 108, display: "inline-block", width: "98%" }}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 10 }}>
            <label
              htmlFor="caption"
              style={{ position: "relative", bottom: 145 }}
            >
              <strong>BIO: </strong>
            </label>
            <textarea
              type="text"
              id="description"
              autoComplete="off"
              rows="10"
              cols="88"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsSeller(true)}
            style={{ display: "block", width: "fit-content", margin: "auto" }}
          >
            BECOME A SELLER
          </button>
          <button type="submit" style={{ marginTop: 10 }}>
            {isLoading ? <Loading /> : "Edit Profile"}
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
      )}
      {accountHolder.isSeller && accountHolder.projects[0] ? (
        <div>
          <strong>PROJECTS:</strong> {mappedProjects}
        </div>
      ) : null}
    </div>
  );
}

export default Account;
