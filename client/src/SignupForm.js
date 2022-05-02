import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [decided, setDecided] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("isSeller", isSeller);
  formData.append("profile_picture", profile_picture);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      body: formData,
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  console.log(profile_picture);

  return (
    <div>
      {decided ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "33%",
            margin: "auto",
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label htmlFor="profile_picture">Profile Picture</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            name="profile_picture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          ></input>
          <button type="submit" style={{ marginTop: 10 }}>
            {isLoading ? "Loading..." : "Sign Up"}
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
      ) : (
        <div>
          <h3 style={{ textAlign: "center" }}>Why are you here?</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "33%",
              margin: "auto",
            }}
          >
            <button
              onClick={() => {
                setDecided(true);
                setIsSeller(true);
              }}
              style={{ display: "block", margin: "auto" }}
            >
              sell some stuff
            </button>
            <button
              onClick={() => setDecided(true)}
              style={{ display: "block", margin: "auto" }}
            >
              just browsing...maybe buy something idk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpForm;
