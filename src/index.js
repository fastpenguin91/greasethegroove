import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Alarm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      alarmCounter: 10,
      time: '0',
//      alarms: ["9:00", "10:00", "11:00", "12:00", "19:45"],
      alarms: [
        {
          id: 1,
          alarm: "9:00",
        },
        {
          id: 2,
          alarm: "10:00",
        },
               {
                 id: 3,
                 alarm: "11:00",
               },
               {
                 id: 4,
                 alarm: "12:00",
               },
               {
                 id: 5,
                 alarm: "19:45",
               }],
    };
  }

  addAlarm(){
    
    let alarms = this.state.alarms.slice();
    let alarmID = this.state.alarmCounter + 1;
    let inputValue = document.getElementById('alarm').value;
    console.log(inputValue);
    this.setState({
      alarmCounter: alarmID,
      time: this.calculateTime(),
      alarms: alarms.concat([
        {
          id: this.state.alarmCounter,
          alarm: inputValue,
        }]),
    });
  }

  removeAlarm(arg1){
    let alarms = this.state.alarms.slice();
    let removeThis = alarms.find(obj => obj.id == arg1);
    //console.log("remove alarm #" + arg1);
//    console.log(removeThis);
    const result = alarms.filter(alarms => alarms.id !== arg1);
    this.setState({
      time: this.calculateTime(),
      alarms: result,
    });

    console.log(result);
  }


  calculateTime(){
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes();// + ":" + today.getSeconds();
    return currentTime;
  }

  checkAlarmStatus(){
    var i;
    let testString = 'test these: ';
    for(i = 0; i < this.state.alarms.length; i++) {
      if (this.calculateTime() === this.state.alarms[i]) {
        testString = "Drop and give me 20 you lazy bum!";
        //console.log("going through for array item: " + i);
      } else {
        testString = "Business as usual...";
        //console.log("going through for array item: " + i);
      }
    }
    return testString;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: this.calculateTime() }), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }



  render() {
    console.log("this was rendered");
    this.items = this.state.alarms.map((item, key) =>
                                       <li key={item.id}>{item.alarm} <span onClick={() => this.removeAlarm(item.id)}>Remove alarm here:</span> </li>
                                    );
    return (
      <div>
        <p>Current Time: {this.state.time}</p>
        <p>{this.checkAlarmStatus()}</p>
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
