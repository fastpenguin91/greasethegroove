import React, { useEffect } from 'react';
import gql from "graphql-tag";
import { useQuery} from "@apollo/react-hooks";
import RemoveAlarm from './RemoveAlarm.js';
import UpdateAlarm from './UpdateAlarm.js';
import '../styles/AlarmList.css';
import AlarmStatus from './AlarmStatus.js';


function getDayString(arr){
  let dayString = "";

  for (let i=0; i < arr.length; i++){
    let expr = arr[i];
    switch(expr) {
    case 0:
      dayString += "Sunday ";
      break;
    case 1:
      dayString += "Monday ";
      break;
    case 2:
      dayString += "Tuesday ";
      break;
    case 3:
      dayString += "Wednesday ";
      break;
    case 4:
      dayString += "Thursday ";
      break;
    case 5:
      dayString += "Friday ";
      break;
    case 6:
      dayString += "Saturday ";
      break;
    default:
      console.log("something went wrong when creating the alarm list");
    }
  }

  return dayString;
}

export default function AlarmList(){

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

  return (
    <div data-testid='currentTime'>
      <AlarmStatus alarmList={data} />
      <h3>Alarms Currently Set:</h3>
      <ul>{data.alarms.map((item, index) => {
        return <li key={item.id}>{item.ringTime} {getDayString(item.days)} <UpdateAlarm currentData={item} /> <RemoveAlarm alarmID={item.id}/></li>
      })}</ul>
    </div>

  );

}
