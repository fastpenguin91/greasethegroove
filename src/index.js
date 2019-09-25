import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Basic from './form.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';



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
          days: [1],
        },
        {
          id: 2,
          alarm: "10:00",
          days: [2,4],
        },
               {
                 id: 3,
                 alarm: "11:00",
                 days: [1,3,5],
               },
               {
                 id: 4,
                 alarm: "12:00",
                 days: [0,2],
               },
               {
                 id: 5,
                 alarm: "19:45",
                 days: [6],
               }],
    };
  }

  addAlarm(){
    let alarms = this.state.alarms.slice();
    let alarmID = this.state.alarmCounter + 1;
    let inputValue = document.getElementById('alarm').value;
 //   console.log(inputValue);
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

  }


  calculateTime(){
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes();// + ":" + today.getSeconds();
    return currentTime;
  }

  calculateDay() {
    let today = new Date();
    return today.getDay();
  }

  checkAlarmStatus(){
    let today = this.calculateDay();
    var i;
    let testString = 'test these: ';
    for(i = 0; i < this.state.alarms.length; i++) {

      if (this.calculateTime() === this.state.alarms[i]) {
        testString = "Drop and give me 20 you lazy bum!";
      } else {
        testString = "Business as usual...";
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

  createAlarmList(){
    var i;
    var i2;
    for(i = 0; i < this.state.alarms.length; i++) {

//      console.log("days for this alarm: " + this.state.alarms[i].alarm);
      let alarmDays = this.state.alarms[i].days;
//      console.log(alarmDays);
      var y;
//      for(y = 0; y < alarmDays.length; y++) {
//        console.log("For inside for: " + alarmDays[y]);
//      }


    }
  }



  render() {
    this.createAlarmList();
    this.items = this.state.alarms.map((item, key) =>
                                       <li key={item.id}>{item.alarm} <span onClick={() => this.removeAlarm(item.id)}>Remove alarm here:</span> </li>
                                    );
    return (
      <div>
        <p>Current Time: {this.state.time}</p>
        <p>{this.checkAlarmStatus()}</p>
        <h1>Any place in your app!</h1>
        <Formik
          initialValues={{ thetime: '', password: '' }}
          validate={values => {
            let errors = {};
            if (!values.thetime) {
              errors.thetime = 'Required';
            }// else if (
             // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.thetime)
            //) {
            //  errors.thetime= 'Invalid email address';
            //}
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //              alert(JSON.stringify(values, null, 2));
              let alarms = this.state.alarms.slice();
              let alarmID = this.state.alarmCounter + 1;
              let inputValue = values.thetime;
              this.setState({
                alarmCounter: alarmID,
                time: this.calculateTime(),
                alarms: alarms.concat([
                  {
                    id: this.state.alarmCounter,
                    alarm: inputValue,
                  }]),
              });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="time" name="thetime" />
              <ErrorMessage name="thetime" component="div" />
              <Field type="password" name="password" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <p>Set an alarm here:</p>
        <input type="time" id="alarm" name="setalarm"/>
        <input type="checkbox" name="vehicle1" value="Sunday"/> Sunday
        <input type="checkbox" name="vehicle1" value="Monday"/> Monday
        <input type="checkbox" name="vehicle1" value="Tuesday"/> Tuesday
        <input type="checkbox" name="vehicle1" value="Wednesday"/> Wednesday
        <input type="checkbox" name="vehicle1" value="Thursday"/> Thursday
        <input type="checkbox" name="vehicle1" value="Friday"/> Friday
        <input type="checkbox" name="vehicle1" value="Saturday"/> Saturday
        <p>Days:</p>
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
