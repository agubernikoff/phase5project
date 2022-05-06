import React, { useState, useEffect } from "react";
import Preorder from "./Preorder";

function ComingSoon() {
  const [preOrderProjects, setPreOrderProject] = useState([]);

  useEffect(() => {
    fetch("/projects")
      .then((r) => r.json())
      .then((data) => setPreOrderProject(data));
  }, []);
  const availableForPreorder = preOrderProjects.map((p) => (
    <Preorder key={p.id} project={p} />
  ));
  return <div>ComingSoon{availableForPreorder}</div>;
}

export default ComingSoon;
