import React, { useState, useEffect, useRef } from "react";
import Display from "./components/display/display.component";
import Buttons from "./components/buttons/buttons.component";
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, map, bufferCount, filter } from "rxjs/operators";

import "./App.css";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [watch, setWatch] = useState(false);
  const [status, setStatus] = useState("reset");

  const clickCount = 2;
  const clickTimespan = 300;

  useEffect(() => {
    const subscribe = new Subject();
    interval(10)
      .pipe(takeUntil(subscribe))
      .subscribe(() => (watch ? run() : null));
    return () => {
      subscribe.next();
      subscribe.complete();
    };
  }, [watch]);

  const waitButton = useRef(null);

  useEffect(() => {
    fromEvent(waitButton.current, "click").subscribe(() =>
      fromEvent(document.querySelector("button.wait"), "click")
        .pipe(
          map(() => new Date().getTime()),
          bufferCount(clickCount, 1),
          filter((timestamps) => {
            return timestamps[0] > new Date().getTime() - clickTimespan;
          })
        )
        .subscribe(() => {
          if (status !== "paused" && status !== "reset") {
            setWatch(false);
            setStatus("paused");
          }
        })
    );
  });
  const start = () => {
    setWatch((prevState) => !prevState);
    setStatus("started");
  };

  const stop = () => {
    setWatch(false);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setStatus("reset");
  };

  const wait = () => {
    console.log("wait");
  };

  const reset = () => {
    setWatch(false);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setStatus("reset");
    if (status !== "reset") setTimeout(() => start(), 100);
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  return (
    <div className="App stopwatch">
      <Display time={time} />
      <Buttons
        start={start}
        stop={stop}
        wait={wait}
        ref={waitButton}
        reset={reset}
        status={status}
      />
    </div>
  );
}

export default App;
