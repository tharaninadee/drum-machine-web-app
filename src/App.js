import React from "react";
import { FaSun, FaMoon, FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa"; 
import "./index.css";



class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Ready to Jam!",
      volume: 0.5,
      theme: "dark", 
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    const audio = document.getElementById(e.key.toUpperCase());
    if (audio) {
      const button = audio.parentElement;
      this.playSound(audio, button.id);
      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 150);
    }
  }

  handleClick(e) {
    const audio = e.target.querySelector("audio");
    if (audio) {
      this.playSound(audio, e.target.id);
      e.target.classList.add("active");
      setTimeout(() => e.target.classList.remove("active"), 150);
    }
  }

  playSound(audio, displayText) {
    audio.volume = this.state.volume;
    audio.currentTime = 0;
    audio.play();
    this.setState({
      display: displayText.replace(/-/g, " "),
    });
    setTimeout(() => this.setState({ display: "Ready for more beats!" }), 3000);
  }

  changeVolume(e) {
    this.setState({
      volume: e.target.value,
      display: `Volume: ${(e.target.value * 100).toFixed(0)}%`,
    });
  }

  toggleTheme() {
    this.setState((prevState) => ({
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
  }

  renderVolumeIcon() {
    const { volume } = this.state;
    if (volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  }

  render() {
    const drumPads = [
      { id: "Chord-1", key: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
      { id: "Chord-2", key: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
      { id: "Chord-3", key: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
      { id: "Kick", key: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
      { id: "Clap", key: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
      { id: "Drum", key: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
      { id: "Shaker", key: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
      { id: "Side-Stick", key: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
      { id: "Heater", key: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    ];

    return (
      <div className={`drum-machine-container ${this.state.theme}`}>
        <div className="controls">
          <div className="header">
            <h1 className="title">Drum Machine</h1>
            <button className="theme-toggle" onClick={this.toggleTheme}>
              {this.state.theme === "dark" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
          <div id="display" className="display">
            {this.state.display}
          </div>
          <div className="volume-control">
            {this.renderVolumeIcon()}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={this.state.volume}
              onChange={this.changeVolume}
              className="volume-slider"
            />
          </div>
        </div>
        <div className="drum-pad-grid">
          {drumPads.map((pad) => (
            <button
              key={pad.key}
              id={pad.id}
              className="drum-pad"
              onClick={this.handleClick}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.src}></audio>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Drum;
