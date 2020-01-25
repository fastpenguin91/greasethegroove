import React, { useState, useEffect, useContext } from 'react';
import gql from "graphql-tag";
import { useQuery} from "@apollo/react-hooks";
import RemoveAlarm from './RemoveAlarm.js';
import UpdateAlarm from './UpdateAlarm.js';
//import { AlarmsContext } from '../contexts/AlarmsContext.js';
import Popup from "reactjs-popup";

export default function AlarmStatus(props){

  let initialPopupState = {
    open: false
  };


//  let hasRang = false;

  const [popupState, setPopupState] = useState(initialPopupState);
  const [alarmsOnState, setAlarmsOnState] = useState(true);
//  const [hasRang, setHasRang] = useState(false);

  const GET_USER_ALARMS = gql`
    query {
      alarms {
        id
        ringTime
        days
      }
    }
  `;


  const { loading, error, data } = useQuery(GET_USER_ALARMS, {
    pollInterval: 100,
  });

  if (loading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return "error..." + {error};
  }




  const testAlarmStatus = () => {
    let today = new Date().getDay();
    let hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();

    if (hours.length == 1) {
      hours = "0".concat('', hours);
    }
    if (minutes.length == 1) {
      minutes = "0".concat('', minutes);
    }

    for (let i=0; i < data.alarms.length; i++) {
      if(data.alarms[i].days.includes(today)) {

        if ( (data.alarms[i].ringTime == `${hours}:${minutes}`) && alarmsOnState ){
//          console.log(hasRang)
          setPopupState({open: true});
        }

      }
    }

  }

  const returnDayString = (day) => {
    var str;
    switch (day) {
    case 0:
      str = "Sunday";
      break;
    case 1:
      str = "Monday";
      break;
    case 2:
      str = "Tuesday";
      break;
    case 3:
      str = "Wednesday";
      break;
    case 4:
      str = "Thursday";
      break;
    case 5:
      str = "Friday";
      break;
    case 6:
      str = "Saturday";
      break;
    }
    return str;
  }

  const calculateTime = () => {
    let today = new Date();
    let currentTime = returnDayString(today.getDay()) + " " + today.getHours() + ":" + today.getMinutes();
    return currentTime;
  }

  const completedExercise = () => {
    setPopupState({open: false});
  }

  const toggleAlarmsOnState = () => {
    setAlarmsOnState(!alarmsOnState);
  }


  return (
    <div>
      <br/>
      <button onClick={toggleAlarmsOnState}>Turn Alarms {alarmsOnState ? 'OFF' : 'ON'}</button>
      <Popup
        open={popupState.open}
        position="right center"
      >
        <h1>DO IT! DO IT NOW!</h1>
        <button onClick={completedExercise}>Done</button>
        <button>Dismiss</button>
      </Popup>
      {
        setInterval(() => {
          testAlarmStatus();
        }, 30000)
      }
      <p>da poo</p>
    </div>

  );

}
