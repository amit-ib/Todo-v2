import React from "react";

const Loader = ({ iconOnly }: { iconOnly?: boolean }) => {
  return (
    <div className={`loader-container ${iconOnly ? "icon-only" : ""}`}>
      <span className="loader">
        <span className="text">L</span> &nbsp;{" "}
        <span className="text">ading</span>
      </span>
    </div>
  );
};

export default Loader;
