import React from "react";

import "./Skeleton.css";

function skeleton({ type = "thumbnail" }) {
  return <div className={`skeleton ${type}`}></div>;
}

export default skeleton;
