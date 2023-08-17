import React from "react";
import "./event-status-badge.scss";

const EventStatusbadge = ({ status, formattedStartDate, formattedEndDate }) => {
  const _generateClassName = (status) => {
    switch (status) {
      case "Completed":
        return "badge badge-secondary";
      case "Ongoing":
        return "badge badge-success";
      case "Scheduled":
        return "badge badge-info";
      default:
        return "badge badge-secondary";
    }
  };

  const cName = _generateClassName(status);
  return (
    <>  
      <span className={cName}>{status}</span>
      <div className="dateRange">{formattedStartDate}</div>
      <div className="dateRange">{formattedEndDate}</div>
    </>
  );
};

export default EventStatusbadge;
