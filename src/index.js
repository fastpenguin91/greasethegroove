import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classNames from 'classnames';
//import Basic from './form.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CurrentTime from './CurrentTime';

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

    console.log("valueArray");
    console.log(valueArray);

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

export default function Alarm2(){
  const defaultState = [
      {
        id: 1,
        alarm: "09:00",
        days: ["1"],
        daysString: "Sunday, ",
      },
      {
        id: 2,
        alarm: "10:00",
        days: ["2","4"],
        daysString: "Monday, Wednesday ",
      },
  ];

  const [alarmState, setAlarmState] = useState(defaultState);

  const removeAlarm = (arg1) => {
    let alarms = alarmState.slice();
    let alarmList;
    const result = alarms.filter(alarms => alarms.id !== arg1);

    setAlarmState(result);
  };

  let listAlarms = alarmState.map((item, key) =>
                                         <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => removeAlarm(item.id)}>Remove</button><button>Edit</button></li>);

  return (
    <div data-testid='currentTime'>
      <ul>{listAlarms}</ul>
    </div>

  );

}

class Alarm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      alarmCounter: 10, // not necessary when I use database. // Mongo or another nosql. 
      //time: 105,
      alarms: [
        {
          id: 1,
          alarm: "09:00",
          days: ["1"],
          daysString: "Sunday, ",
        },
        {
          id: 2,
          alarm: "10:00",
          days: ["2","4"],
          daysString: "Monday, Wednesday ",
        },],
      alarmToEdit: {
        checkboxGroup: ["5"],
        thetime: "09:00"},
    };
  }

  removeAlarm(arg1){
    let alarms = this.state.alarms.slice();
    //let removeThis = alarms.find(obj => obj.id == arg1);
    const result = alarms.filter(alarms => alarms.id !== arg1);
    this.setState({
      alarms: result,
    });

  }

// create new date object via eventlistener. 
  calculateTime(){
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes();// + ":" + today.getSeconds();
    return currentTime;
  } // converted to const

  calculateDay() {
    let today = new Date();
    return today.getDay();
  } // Where is this necessary?

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

  returnDays(days){
    let i;
    let returnString = "";
    for(i = 0; i < days.length; i++) {
        switch (days[i]) {
        case "1":
          returnString += "Sunday, ";
          break;
        case "2":
          returnString += "Monday, ";
          break;
        case "3":
          returnString += "Tuesday, ";
          break;
        case "4":
          returnString += "Wednesday, ";
          break;
        case "5":
          returnString += "Thursday, ";
          break;
        case "6":
          returnString += "Friday, ";
          break;
        case "7":
          returnString += "Saturday, ";
          break;
        default:
          console.log("Nothing matched");
        }
    }
    return returnString;

  }

  editAlarm(arg1){
    console.log("editing alarm #: " + arg1);
    let obj = this.state.alarms.find(obj => obj.id == arg1);
    console.log("obj is...");
    console.log(obj);
    this.setState({
      alarmToEdit: {
        id: obj.id,
        checkboxGroup: obj.days,
        thetime: obj.alarm,
      }
    });
    console.log("new state:");
    console.log(this.state.alarmToEdit);
  }

  render() {
    //this.createAlarmList(); // I dont think this does anything anymore
    this.items = this.state.alarms.map((item, key) =>
                                       <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => this.removeAlarm(item.id)}>Remove</button><button onClick={() => this.editAlarm(item.id)}>Edit</button> </li>
                                            );
    return (
      <div>
        <CurrentTime />
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
          let inputValue = values.thetime;
          let finalDays = this.returnDays(values.checkboxGroup);

          this.setState({
            alarmCounter: alarmID,
            alarms: alarms.concat([
              {
                id: this.state.alarmCounter,
                alarm: inputValue,
                days: values.checkboxGroup,
                daysString: finalDays,
              }]),
          });

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

        <p>Alarms Currently Set:</p>
        <ul>{this.items}</ul>

        <p>Edit alarms with this form:</p>
        <Formik enableReinitialize={true} id="lala"

      initialValues={{
        checkboxGroup: this.state.alarmToEdit.checkboxGroup,
        thetime: this.state.alarmToEdit.thetime,
//        checkboxGroup: this.state.alarms[1].days,
//        thetime: this.state.alarms[0].alarm,

      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {

          let alarms = this.state.alarms.slice();
          var alarmID = this.state.alarmToEdit.id;
          let inputValue = values.thetime;
          let finalDays = this.returnDays(values.checkboxGroup);
          let updatedAlarm = {};
          let obj = alarms.find(obj => obj.id == this.state.alarmToEdit.id);
          updatedAlarm.alarm = inputValue;
          updatedAlarm.days = values.checkboxGroup;
          updatedAlarm.daysString = finalDays;

          var filtered = alarms.filter(function(value, index, arr) {
            if (value.id !== alarmID) {
              return value;
            }
          });


          this.setState({
            alarms: filtered.concat([
              {
                id: alarmID,
                alarm: inputValue,
                days: values.checkboxGroup,
                daysString: finalDays,
              }]),
            });

/*          this.setState({
            alarms: alarms.concat([
              {
                id: this.state.alarmCounter,
                alarm: inputValue,
                days: values.checkboxGroup,
                daysString: finalDays,
              }]),
          });*/

/*          this.setState({
            alarmCounter: alarmID,
            alarms: alarms.concat([
              {
                id: this.state.alarmCounter,
                alarm: inputValue,
                days: values.checkboxGroup,
                daysString: finalDays,
              }]),
          });*/

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
              value="true"
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



      </div>
    );
  }

}


class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Alarm2 />
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
