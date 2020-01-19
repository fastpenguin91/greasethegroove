import React, {useState } from 'react';
//import UpdateAlarmList from '../components/UpdateAlarmList';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "./Checkbox.js";
import Popup from "reactjs-popup";


const UPDATE_ALARM = gql`
    mutation UpdateAlarm($ringTime: String!, $days: [Int!]!, $alarmID: String! ) {
      updateAlarm(ringTime: $ringTime, days: $days, alarmID: $alarmID) {
        id
        days
        ringTime
        owner {
          id
          email
        }
      }
    }
  `;


export default function UpdateAlarm(props){


  const [updateAlarm] = useMutation(UPDATE_ALARM);


  let initialCheckboxState = {
    sunday: {
      checked: props.currentData.days.includes(0) ? true : false,
      val: 0
    },
    monday: {
      checked: props.currentData.days.includes(1) ? true :  false,
      val: 1
    },
    tuesday: {
      checked: props.currentData.days.includes(2) ? true :  false,
      val: 2
    },
    wednesday: {
      checked: props.currentData.days.includes(3) ? true :  false,
      val: 3
    },
    thursday: {
      checked: props.currentData.days.includes(4) ? true :  false,
      val: 4
    },
    friday: {
      checked: props.currentData.days.includes(5) ? true :  false,
      val: 5
    },
    saturday: {
      checked: props.currentData.days.includes(6) ? true :  false,
      val: 6
    },
  }
  const OPTIONS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];

  let initialPopupState = { open: false};

  const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
  const [ringTime, setRingTime] = useState(props.currentData.ringTime);
  const [popupState, setPopupState] = useState(initialPopupState);


  const openModal = () => {
    let newState = { open: true}
    setPopupState(newState);
  }

  const closeModal = () => {
    let newState = { open: false}
    setPopupState(newState);
  }

  const handleCheckboxChange = e => {
    const { name } = e.target;
    let newCheckboxes = {...checkboxes};
    newCheckboxes[name].checked = !checkboxes[name].checked;

    setCheckboxes(newCheckboxes);

  }

  const handleTimeChange = e => {
//    const { currentTime } = e.target;
    setRingTime(e.target.value)
  }

  const prepareCheckboxArray = () => {
    let objKeys = Object.keys(checkboxes);
    let newArr = [];
    for (let i=0; i < objKeys.length; i++ ) {
      if (checkboxes[objKeys[i]].checked ) {
        newArr.push(checkboxes[objKeys[i]].val);
      }
    }
    return newArr;
    
  }


  function handleSubmit(e){
    let checkboxArr = prepareCheckboxArray();
    e.preventDefault();
    updateAlarm({ variables: {ringTime: ringTime, days: checkboxArr, alarmID: props.currentData.id}})
    // setCheckboxes(initialCheckboxState);
    // setRingTime("");
  }

  const createCheckbox = option => {
    return (
      <Checkbox
        key={checkboxes[option].val}
        label={option}
        isSelected={checkboxes[option].checked}
        onCheckboxChange={handleCheckboxChange}
      />
    );
  }

  const createCheckboxes = () => OPTIONS.map(createCheckbox);

  return (
    // <button onClick={updateForm}>Update</button>
    // <Popup trigger={<button>Update</button>} position="right center">
    <div>
      <button className="button" onClick={openModal}>
        Update
      </button>
      <Popup
        open={popupState.open}
        position="right center"
        onClose={closeModal}
      >
        <a className="close" onClick={closeModal}>
          &times;
        </a>
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={props.currentData.id} name="id"/>
          <label>
            Ring Time:
            <input type="time" value={ringTime} onChange={handleTimeChange} name="ringTime" required/></label>
          {createCheckboxes()}
          <input type="submit" value="Update Alarm"/>
        </form>
      </Popup>
    </div>
  );
}
