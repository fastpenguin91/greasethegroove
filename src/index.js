import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Alarm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: '0',
      alarms: [],
    };
  }

  addAlarm(){
    // is this an immutable way to add an alarm?
    console.log("Hey there");
    let alarms = this.state.alarms.slice();
    let inputValue = document.getElementById('alarm').value;
    console.log(inputValue);
    this.setState({
      time: this.calculateTime(),
      alarms: alarms.concat([inputValue]),
    });
  }


  calculateTime(){
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return currentTime;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: this.calculateTime() }), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }



  render() {
    this.items = this.state.alarms.map((item, key) =>
                                     <li>{item}</li>
                                    );
    return (
      <div>
        <p>Current Time: {this.state.time}</p>
        <p></p>
        <p>Set an alarm here:</p>
        <input type="time" id="alarm" name="setalarm"/>
        <p onClick={() => this.addAlarm()}>SET!</p>
        <p>Alarms Currently Set:</p>
        <ul>{this.items}</ul>
      </div>
    );
  }

}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Alarm />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
