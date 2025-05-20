import {Component} from "react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { minutes: 25, seconds: 0, timerlimit: 25, isRunning: false };
  }

  onStartTimer = () => {
    const { isRunning, minutes, seconds, timerlimit } = this.state;
    
    if (isRunning) {
      clearInterval(this.counterA);
      this.setState({ isRunning: false });
    } else {
      const startMinutes = minutes === 0 && seconds === 0 ? timerlimit : minutes;
      const startSeconds = minutes === 0 && seconds === 0 ? 0 : seconds;
      
      this.setState({ 
        isRunning: true,
        minutes: startMinutes,
        seconds: startSeconds
      });

      this.counterA = setInterval(() => {
        this.setState((prev) => {
          if (prev.seconds > 0) {
            return { seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            clearInterval(this.counterA);
            return { isRunning: false };
          }
        });
      }, 1000);
    }
  };

  onResetTimer = () => {
    const { timerlimit } = this.state;
    clearInterval(this.counterA);
    this.setState({ minutes: timerlimit, seconds: 0, isRunning: false });
  };

  ondecrease = () => {
    if (!this.state.isRunning && this.state.timerlimit > 1) {
      this.setState((prev) => ({
        timerlimit: prev.timerlimit - 1,
        minutes: prev.timerlimit - 1,
        seconds: 0
      }));
    }
  };

  onincrease = () => {
    if (!this.state.isRunning) {
      this.setState((prev) => ({
        timerlimit: prev.timerlimit + 1,
        minutes: prev.timerlimit + 1,
        seconds: 0
      }));
    }
  };

  render() {
    const { minutes, seconds, timerlimit, isRunning } = this.state;
    const Seconds = seconds < 10 ? `0${seconds}` : seconds;
    const Minutes = minutes < 10 ? `0${minutes}` : minutes;

    return (
      <div className="main-container">
        <h1 className="head">Digital Timer</h1>
        <div className="timer-container">
          <h1>{isRunning ? 'Running' : 'Paused'} {Minutes}:{Seconds}</h1>
        </div>
        
        <div className="src">
          <button className="start-btn" onClick={this.onStartTimer}>
            <img 
              src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png" 
              className="btn-image" 
              alt-text="start"
            />
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="reset-btn" onClick={this.onResetTimer}>
            <img 
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png" 
              className="btn-image" 
              alt-text="reset"
            />
            Reset
          </button>
        </div>

        <div className="set-limit">
          <div>Set Timer Limit</div>
          <div className="limit">
            <button 
              onClick={this.ondecrease} 
              // disabled={isRunning || timerlimit <= 1}
            >
              -
            </button>
            <div className="limit-value">{timerlimit}</div>
            <button 
              onClick={this.onincrease} 
              // disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;