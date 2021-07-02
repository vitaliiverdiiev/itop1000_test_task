import React from "react";
import Button from "../button/button.component";

import "./buttons.styles.scss";

const Buttons = React.forwardRef(
  ({ start, stop, reset, wait, status }, ref) => {
    return (
      <div className="buttons">
        <Button
          classes={
            status === "started"
              ? "btn-danger"
              : status === "paused"
              ? "btn-success"
              : "btn-success"
          }
          title={
            status === "reset"
              ? "start"
              : status === "paused"
              ? "resume"
              : "stop"
          }
          onclick={
            status === "reset" ? start : status === "paused" ? start : stop
          }
        />
        <Button
          classes="btn-secondary wait"
          title="wait"
          onclick={wait}
          ref={ref}
        />
        <Button classes="btn-danger" title="reset" onclick={reset} />
      </div>
    );
  }
);

export default Buttons;
