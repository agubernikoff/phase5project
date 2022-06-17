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
  updateProjectsOnPreorder,
}) {
  const projectsWithoutUpdates = [...preOrderProjects].filter(
    (p) => !p.production_updates[0]
  );

  const projectsWithUpdates = [...preOrderProjects].filter(
    (p) => p.production_updates[0]
  );

  const sorted = [...projectsWithUpdates].sort(
    (a, b) =>
      new Date(
        b.production_updates[b.production_updates.length - 1].created_at
      ).getTime() -
      new Date(
        a.production_updates[a.production_updates.length - 1].created_at
      ).getTime()
  );

  const availableForPreorder = [...sorted, ...projectsWithoutUpdates].map(
    (p) => (
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
        updateProjectsOnPreorder={updateProjectsOnPreorder}
      />
    )
  );
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>COMING SOON</h3>
      {availableForPreorder}
    </div>
  );
}

export default ComingSoon;
