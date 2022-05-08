import React from "react";
import Preorder from "./Preorder";

function ComingSoon({
  preOrderProjects,
  user,
  updateUserLikesOnLike,
  updatePostLikesOnLike,
  updateUserLikesOnUnlike,
  updatePostLikesOnUnlike,
  updatePostCommentsOnComment,
  updatePostCommentsOnDelete,
  updatePostsOnLikesThreshold,
  updateProjectsOnThreshold,
}) {
  const availableForPreorder = preOrderProjects.map((p) => (
    <Preorder
      key={p.id}
      project={p}
      user={user}
      updateUserLikesOnLike={updateUserLikesOnLike}
      updateUserLikesOnUnlike={updateUserLikesOnUnlike}
      updatePostLikesOnLike={updatePostLikesOnLike}
      updatePostLikesOnUnlike={updatePostLikesOnUnlike}
      updatePostCommentsOnComment={updatePostCommentsOnComment}
      updatePostCommentsOnDelete={updatePostCommentsOnDelete}
      updatePostsOnLikesThreshold={updatePostsOnLikesThreshold}
      updateProjectsOnThreshold={updateProjectsOnThreshold}
    />
  ));
  return <div>ComingSoon{availableForPreorder}</div>;
}

export default ComingSoon;
