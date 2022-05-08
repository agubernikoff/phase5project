import React from "react";
import Preorder from "./Preorder";

function ComingSoon({ preOrderProjects, user }) {
  const availableForPreorder = preOrderProjects.map((p) => (
    <Preorder key={p.id} project={p} user={user} />
  ));
  return <div>ComingSoon{availableForPreorder}</div>;
}

export default ComingSoon;
