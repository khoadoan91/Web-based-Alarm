import React from "react";
import Sound from "react-sound";

export default class extends React.Component {
  state = { enable: true, isRing: false };

  componentDidMount() {
    this.enable();
  }

  handleChange = () => {
    if (this.state.enable) {
      this.disable();
    } else {
      this.enable();
    }
    this.setState({ enable: !this.state.enable });
  };

  disable = () => {
    clearTimeout(this.timeoutId);
  };

  enable = () => {
    const now = new Date();
    const { alarm } = this.props;
    const alarmInSecond = alarm.getHours() * 3600 + alarm.getMinutes() * 60;
    let countdown =
      alarmInSecond -
      (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());

    if (countdown < 0) {
      countdown += 24 * 60 * 60;
    }
    console.log("countdown", countdown);
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
        {this.state.isRing ? this.renderSound() : null}
      </li>
    );
  }

  renderSound = () => {
    return (
      <div>
        <Sound
          url="../sounds/Fire_pager-jason.mp3"
          playStatus={Sound.status.PLAYING}
          playingFromPosition={0}
        />
        <button
          onClick={() => {
            this.enable();
            this.setState({ isRing: false });
          }}
        >
          Dismiss
        </button>
      </div>
    );
  };
}
