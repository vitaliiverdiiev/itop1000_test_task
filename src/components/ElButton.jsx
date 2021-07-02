import React from "react";

class ElButton extends React.Component {
  state = {};
  render() {
    let clicks = [];
    let timeout;

    function singleClick(event) {
      console.log(clicks[clicks.length - 1] - clicks[clicks.length - 2]);

      alert("single click");
    }

    function doubleClick(event) {
      console.log(clicks[clicks.length - 1] - clicks[clicks.length - 2]);
      alert("doubleClick");
    }

    function clickHandler(event) {
      event.preventDefault();
      clicks.push(new Date().getTime());
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (
          clicks.length > 1 &&
          clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300
        ) {
          doubleClick(event.target);
        } else {
          singleClick(event.target);
        }
      }, 250);
    }

    return (
      <a
        className="btn btn-warning"
        style={{ width: "100%" }}
        onClick={clickHandler}
      >
        click me
      </a>
    );
  }
}

export default ElButton;
