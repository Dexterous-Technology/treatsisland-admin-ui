import React from "react";
import "./toggle-button.scss";
const ToggleButton = ({ onToggle = () => {}, isEnabled = "true" }) => {
  return (
    <div
      className={"activeToggle " + (isEnabled === "true" ? "on" : "off")}
      onClick={(e) => onToggle(!isEnabled)}
    >
      {isEnabled === "true" ? (
        <>
          <i className="fas fa-toggle-on"></i>
          <span>Active</span>
        </>
      ) : (
        <>
          <i className="fas fa-toggle-off"></i>
          <span>Deactive</span>
        </>
      )}
    </div>
  );
};

export default ToggleButton;
