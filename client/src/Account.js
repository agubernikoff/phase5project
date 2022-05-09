import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Account() {
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => console.log(data));
  });
  return <div>Account</div>;
}

export default Account;
