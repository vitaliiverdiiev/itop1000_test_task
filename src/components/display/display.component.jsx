import React from "react";
import "./display.styles.scss";

const Display = ({ time }) => {
  return (
    <div className="display">
      <span className="badge bg-secondary">
        {time.h >= 10 ? time.h : "0" + time.h}
      </span>
      &nbsp;:&nbsp;
      <span className="badge bg-secondary">
        {time.m >= 10 ? time.m : "0" + time.m}
      </span>
      &nbsp;:&nbsp;
      <span className="badge bg-secondary">
        {time.s >= 10 ? time.s : "0" + time.s}
      </span>
      {/* &nbsp;:&nbsp;
      <span className="badge bg-secondary">
        {time.ms >= 10 ? time.ms : "0" + time.ms}
      </span> */}
    </div>
  );
};

export default Display;
