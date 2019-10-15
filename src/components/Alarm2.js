import React, { useContext, useState, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CheckboxGroup from '../components/CheckboxGroup';
import Checkbox from '../components/Checkbox';


export default function Alarm2(){
  const { alarms, dispatch } = useContext(AlarmContext);

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

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'GET_CURRENT_TIME'});
    }, 1000);
  });


  const removeAlarm = (arg1) => {
    let alarms = alarmState.slice();
    let alarmList;
    const result = alarms.filter(alarms => alarms.id !== arg1);

    setAlarmState(result);
  };

  const returnDays = (days) => {
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

  const submitAlarmForm = (vals) => {
    let alarms = alarmState.slice();
    let alarmID = alarmState.length + 1;
    let inputValue = vals.thetime;
    let finalDays = returnDays(vals.checkboxGroup);

    let testArr = [...alarmState];
    console.log("testArr");
    console.log(testArr);

    let newAlarm = {
      id: alarmState.length + 1,
      alarm: vals.thetime,
      days: vals.checkboxGroup,
      daysString: finalDays,

      }


    setAlarmState([...alarmState, newAlarm]);
    console.log('vals');
    console.log(vals);

    /*this.setState({
      alarms: alarms.concat([
      {
      id: this.state.alarmCounter,
      alarm: values.thetime,
      days: values.checkboxGroup,
      daysString: finalDays,
      }]),
      });*/
  }



  let listAlarms = alarmState.map((item, key) =>
                                         <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => removeAlarm(item.id)}>Remove</button><button>Edit</button></li>);

  return (
    <div data-testid='currentTime'>
      <p>Current Time: {alarms}</p>
      <h3>Alarms Currently Set:</h3>
      <ul>{listAlarms}</ul>

      <Formik
        initialValues={{
          checkboxGroup: [],
          thetime: '',

        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {

            submitAlarmForm(values);


/*          let alarms = alarmState.slice();
          let alarmID = alarmState.length + 1;
          let inputValue = values.thetime;
          let finalDays = this.returnDays(values.checkboxGroup);
          */

          /*this.setState({
            alarms: alarms.concat([
              {
                id: this.state.alarmCounter,
                alarm: values.thetime,
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
