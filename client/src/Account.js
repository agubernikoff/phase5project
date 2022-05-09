import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preorder from "./Preorder";

function Account({ user }) {
  const [accountHolder, setAccountHolder] = useState("");
  let { id } = useParams();
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => setAccountHolder(data));
  }, [id]);
  console.log(accountHolder);

  const mappedProjects = accountHolder.projects
    ? accountHolder.projects.map((p) => (
        <Preorder key={p.id} user={user} project={p} />
      ))
    : null;
  return (
    <div>
      <img
        alt={accountHolder.username}
        src={accountHolder.profile_picture}
        style={{ width: "10%", borderRadius: 50 }}
      />
      <span style={{ fontSize: 108 }}>{accountHolder.username} </span>
      {accountHolder.id === user.id ? <button>EDIT PROFILE</button> : null}
      {accountHolder.isSeller ? (
        <div>
          <strong>PROJECTS:</strong> {mappedProjects}
        </div>
      ) : null}
    </div>
  );
}

export default Account;
