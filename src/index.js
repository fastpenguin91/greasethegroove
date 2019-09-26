import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classNames from 'classnames';
//import Basic from './form.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Input feedback
const InputFeedback = ({ error }) =>
      error ? <div className={classNames("input-feedback")}>{error}</div> : null;



// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  }
}



const Checkbox = ({
  field: { name, value, onChange,onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};


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

    <Formik
      initialValues={{
        checkboxGroup: [],
        thetime: '',

      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {


          let alarms = this.state.alarms.slice();
          let alarmID = this.state.alarmCounter + 1;
          console.log("the time");
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


          console.log(this.state);
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
      render={({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Field type="time" name="thetime" />

          <h2>Checkbox group</h2>
          <CheckboxGroup
            id="checkboxGroup"
            label="Which of these?"
            value={values.checkboxGroup}
            error={errors.checkboxGroup}
            touched={touched.checkboxGroup}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="alarmDay"
              id="1"
              label="Sunday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="2"
              label="Monday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="3"
              label="Tuesday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="4"
              label="Wednesday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="5"
              label="Thursday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="6"
              label="Friday"
            />
            <Field
              component={Checkbox}
              name="alarmDay"
              id="7"
              label="Saturday"
            />
          </CheckboxGroup>


          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    />







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
