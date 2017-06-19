import React from "react";
import Sound from "react-sound";

export default class extends React.Component {
  state = { enable: true, isRing: false, isSnooze: false, countdown: 0 };

  componentDidMount() {
    this.enable(this.props.alarm);
    this.snoozeAlarm = null;
    this.countdown = 0;
  }

  handleChange = () => {
    if (this.state.enable) {
      this.disable();
    } else {
      this.enable(this.props.alarm);
    }
    this.setState({ enable: !this.state.enable });
  };

  disable = () => {
    clearTimeout(this.timeoutId);
  };

  enable = alarm => {
    const now = new Date();
    // const { alarm } = this.props;
    const alarmInSecond = alarm.getHours() * 3600 + alarm.getMinutes() * 60;
    let countdown =
      alarmInSecond -
      (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());

    if (countdown < 0) {
      countdown += 24 * 60 * 60;
    }
    console.log("countdown", countdown);
    this.setState({ countdown });
    countdown *= 1000;

    this.timeoutId = setTimeout(() => {
      this.setState({ isRing: true });
      this.disable();
    }, countdown);
  };

  render() {
    return (
      <li className="alarm-detail">
        <input
          type="checkbox"
          onChange={() => {
            this.handleChange();
          }}
          checked={this.state.enable}
        />
        <span>
          {this.props.alarm.toTimeString().split(" ")[0].substr(0, 5)}
        </span>
        <button onClick={() => this.props.onRemove(this.props.order)}>
          Delete
        </button>
        {this.state.isRing || this.state.isSnooze ? this.renderSound() : null}
      </li>
    );
  }

  renderSound = () => {
    return (
      <div>
        {this.state.isRing
          ? <Sound
              url="../sounds/Fire_pager-jason.mp3"
              playStatus={Sound.status.PLAYING}
              playingFromPosition={0}
            />
          : null}
        {this.state.isSnooze && !this.state.isRing
          ? this.renderCountdown()
          : <button
              onClick={() => {
                if (!this.snoozeAlarm) {
                  this.snoozeAlarm = new Date(this.props.alarm.getTime());
                }
                this.snoozeAlarm.setMinutes(this.snoozeAlarm.getMinutes() + 1);
                this.enable(this.snoozeAlarm);
                this.setState({ isSnooze: true, isRing: false });
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                  this.setState({ countdown: this.state.countdown - 1 });
                }, 1000);
              }}
            >
              Snooze
            </button>}

        <button
          onClick={() => {
            this.enable(this.props.alarm);
            this.snoozeAlarm = null;
            this.setState({ isSnooze: false, isRing: false });
            clearInterval(this.interval);
          }}
        >
          Dismiss
        </button>
      </div>
    );
  };

  renderCountdown = () => {
    return <div>Will ring on {this.state.countdown} seconds</div>;
  };
}
