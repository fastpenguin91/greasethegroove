import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CheckboxGroup from '../components/CheckboxGroup';
import Checkbox from '../components/Checkbox';


export default function UpdateAlarmList(){

  /*const submitAlarmForm = (vals) => {

    let newAlarm = {
      id: props.alarmList.length + 1,
      //id: alarmState.length + 1,
      alarm: vals.thetime,
      days: vals.checkboxGroup,
      daysString: returnDayString(vals.checkboxGroup),
    };

    setAlarmState([...alarmState, newAlarm]);
  };*/


  return (

    <div>
      Add your alarms here!!

      <Formik
        initialValues={{
          checkboxGroup: [],
          thetime: '',

        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            //submitAlarmForm(values);

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

  )
}
