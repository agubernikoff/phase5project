import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [decided, setDecided] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        isSeller,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  console.log(isSeller);
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
