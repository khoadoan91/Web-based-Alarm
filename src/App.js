import React from "react";

import TimePicker from "./TimePicker";

export default class extends React.Component {
  state = {
    time: new Date(),
    alarms: [],
    timePicker: new Date()
  };

  componentDidMount() {
    this.id = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  handleClick(time, inc) {
    const newTime = new Date(this.state.timePicker.getTime());
    switch (time) {
      case "hour":
        newTime.setHours(newTime.getHours() + inc);
        break;
      case "min":
        newTime.setMinutes(newTime.setMinutes() + inc);
        break;
      default:
        return;
    }
    this.setState({ timePicker: newTime });
  }

  render() {
    const { timePicker, time } = this.state;
    return (
      <div>
        <h1>{time.toTimeString().split(" ")[0]}</h1>
        <TimePicker
          value={timePicker.getHours()}
          onInc={() => this.handleClick("hour", 1)}
          onDec={() => this.handleClick("hour", -1)}
        />
        <TimePicker
          value={timePicker.getMinutes()}
          onInc={() => this.handleClick("min", 1)}
          onDec={() => this.handleClick("min", -1)}
        />
        <button type="submit">Add</button>
      </div>
    );
  }
}
