import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "./assets/profile.jpeg";
import Loading from "./Loading";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [decided, setDecided] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  async function fetchAsFile(path) {
    const response = await fetch(path);
    const blob = await response.blob();
    return new File([blob], path);
  }

  useEffect(() => {
    fetchAsFile(profile).then((data) => setProfilePicture(data));
  }, []);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("isSeller", isSeller);
  formData.append("profile_picture", profile_picture);
  formData.append("bio", bio);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      body: formData,
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

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
          <label htmlFor="caption">Bio:</label>
          <textarea
            type="text"
            id="description"
            autoComplete="off"
            rows="10"
            cols="75"
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button type="submit" style={{ marginTop: 10 }}>
            {isLoading ? <Loading /> : "Sign Up"}
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
