import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Account({ user }) {
  const [accountHolder, setAccountHolder] = useState("");
  let { id } = useParams();
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => setAccountHolder(data));
  }, [id]);
  return (
    <div>
      {accountHolder.username}{" "}
      {accountHolder.id === user.id ? "show_form" : "hide_form"}
    </div>
  );
}

export default Account;
