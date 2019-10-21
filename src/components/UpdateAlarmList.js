import React, { useContext } from 'react';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Formik, Field } from 'formik';
import CheckboxGroup from '../components/CheckboxGroup';
import Checkbox from '../components/Checkbox';
import { AlarmContext } from '../contexts/AlarmContext';



export default function UpdateAlarmList(){
  const { alarmObj, dispatch } = useContext(AlarmContext);
  const isEditingForm = alarmObj.alarmToEdit.id.length == 0 ? false : true;


  const returnDayString = (days) => {
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
  };

  const clearFormButton = () => {
    if (isEditingForm) {
      return <button onClick={() => dispatch({ type: 'CLEAR_FORM'})}>Clear Form</button>
    }
  }

  const submitAlarmForm = (vals) => {

    let newAlarm = {
      id: alarmObj.alarmToEdit.id ? alarmObj.alarmToEdit.id : alarmObj.alarmList.length + 1,
      alarm: vals.thetime,
      days: vals.checkboxGroup,
      daysString: returnDayString(vals.checkboxGroup),
    };

    dispatch({ type: 'UPDATE_ALARMLIST', alarmVals: newAlarm});

  };


  return (

    <div>
      <h2>Add/Update your alarms here!!</h2>
      {clearFormButton()}

      <Formik enableReinitialize={true}
        initialValues={{
          checkboxGroup: alarmObj.alarmToEdit.checkboxGroup,
          thetime: alarmObj.alarmToEdit.thetime,

        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            submitAlarmForm(values);

            actions.resetForm();
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
            <h3>Set Time:</h3>
            <Field type="time" name="thetime" />

            <h2>Set Days:</h2>
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

  )
}
