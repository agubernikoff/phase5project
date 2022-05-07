import React from "react";
import Preorder from "./Preorder";

function ComingSoon({ preOrderProjects }) {
  const availableForPreorder = preOrderProjects.map((p) => (
    <Preorder key={p.id} project={p} />
  ));
  return <div>ComingSoon{availableForPreorder}</div>;
}

export default ComingSoon;
