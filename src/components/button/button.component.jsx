import React from "react";

import "./button.styles.scss";

const Button = React.forwardRef(({ title, onclick, classes }, ref) => {
  return (
    <button
      className={`btn ${classes}`}
      onClick={(e) => (onclick ? onclick(e) : console.log("no function"))}
      ref={ref}
    >
      {title}
    </button>
  );
});

export default Button;
