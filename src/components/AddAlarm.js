import React, { useState } from 'react';
//import UpdateAlarmList from '../components/UpdateAlarmList';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "./Checkbox.js";



const ADD_ALARM = gql`
    mutation AddAlarm($ringTime: String!, $days: [Int!]!, $ownerEmail: String! ) {
      createAlarm(ringTime: $ringTime, days: $days, ownerEmail: $ownerEmail) {
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


export default function AddAlarm(props){

//    const { loading, error, data } = useMutation(REMOVE_ALARM);

  const [addAlarm, { data }] = useMutation(ADD_ALARM);


  let initialCheckboxState = {
    sunday: {
      checked: false,
      val: 0
    },
    monday: {
      checked: false,
      val: 1
    },
    tuesday: {
      checked: false,
      val: 2
    },
    wednesday: {
      checked: false,
      val: 3
    },
    thursday: {
      checked: false,
      val: 4
    },
    friday: {
      checked: false,
      val: 5
    },
    saturday: {
      checked: false,
      val: 6
    },
  }
  const OPTIONS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
  const [ringTime, setRingTime] = useState("");

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
    addAlarm({ variables: {ringTime: ringTime, days: checkboxArr, ownerEmail: "susie@susie.com"}})
    setCheckboxes(initialCheckboxState);
    setRingTime("");
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
    <div>
      <h1>add alarm here:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ring Time: 
          <input type="time" value={ringTime} onChange={handleTimeChange} name="ringTime" required />
        </label>
        {createCheckboxes()}
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}
