import React from "react";

const TimePicker = ({ value, onInc, onDec }) =>
  <div>
    <h5 style={{ display: "inline-block" }}>{value}</h5>
    <button onClick={onInc} />
    <button onClick={onDec} />
  </div>;

export default TimePicker;
