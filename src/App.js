import React from "react";

import TimePicker from "./TimePicker";
import AlarmDetail from "./AlarmDetail";

export default class extends React.Component {
  state = {
    time: new Date(),
    alarms: [],
    timePicker: new Date()
  };

  componentDidMount() {
    this.state.timePicker.setSeconds(0);
    this.interval = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = (time, inc) => {
    const newTime = new Date(this.state.timePicker.getTime());
    switch (time) {
      case "hour":
        newTime.setHours(newTime.getHours() + inc);
        break;
      case "min":
        newTime.setMinutes(newTime.getMinutes() + inc);
        break;
      default:
        return;
    }
    this.setState({ timePicker: newTime });
  };

  render() {
    const { timePicker, time } = this.state;
    return (
      <div>
        <h1>{time.toTimeString().split(" ")[0]}</h1>
        <div>Please Set Alarm</div>
        <TimePicker
          value={timePicker.getHours()}
          time="Hour"
          onInc={() => this.handleClick("hour", 1)}
          onDec={() => this.handleClick("hour", -1)}
        />
        <span style={{ position: "relative", top: -34 }} className="colon">
          :
        </span>
        <TimePicker
          value={timePicker.getMinutes()}
          time="Minute"
          onInc={() => this.handleClick("min", 1)}
          onDec={() => this.handleClick("min", -1)}
        />
        <br />
        <button
          type="submit"
          onClick={() => {
            this.setState({
              alarms: this.state.alarms.concat(this.state.timePicker)
            });
          }}
        >
          Add
        </button>
        <br />
        <ul style={{ display: "inline-block" }}>
          {this.renderAlarms()}
        </ul>
      </div>
    );
  }

  renderAlarms = () => {
    return this.state.alarms.map((n, i) =>
      <AlarmDetail
        onRemove={this.removeAlarm.bind(this)}
        key={i}
        order={i}
        alarm={n}
      />
    );
  };

  removeAlarm = id => {
    const { alarms } = this.state;
    this.setState({ alarms: alarms.slice(0, id).concat(alarms.slice(id + 1)) });
  };
}
