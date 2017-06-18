import React from "react";

const TimePicker = ({ value, onInc, onDec, time }) =>
  <div style={{ display: "inline-block", margin: 16, textAlign: "center" }}>
    <h4>{time}</h4>
    <h3 style={{ margin: 15 }}>{("0" + value).slice(-2)}</h3>
    <button onClick={onInc}>Up</button>
    <button onClick={onDec}>Down</button>
  </div>;

export default TimePicker;
