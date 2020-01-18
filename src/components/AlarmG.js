import React, { useContext, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import AddAlarm from './AddAlarm';


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
    }
  }

  return dayString;
  
}

//console.log(getDayString([0,3,6]));

/*const ADD_ALARM = gql`
mutation AddAlarm($type: String!) {
  createAlarm(data: {
  ringTime: "08:27"
  days: {
    set: [5,6]
  }
  owner: {
    connect: {
      email: "susie@susie.com"
    }
  }
}) {
    id
    ringTime
  }
}`;*/


export default function AlarmG(){
  const { currentTime, timeDispatch } = useContext(CurrentTimeContext);
  const { alarmObj, dispatch } = useContext(AlarmContext);

  const GET_USER_ALARMS = gql`
    query {
      alarms {
        id
        ringTime
        days
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_USER_ALARMS);

  if (loading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return "error..." + {error};
  }
//  console.log("user alarms from useQuery");
//  console.log(data);

  console.log("user alarms from alarmContext");
  console.log(alarmObj);

//  const [addAlarm, { addAlarmData}] = useMutation(ADD_ALARM);

/*  useEffect(() => {
    setInterval(() => {
      timeDispatch({ type: 'GET_CURRENT_TIME'});
    }, 1000);
  }); */

  const checkAlarmStatus = () => {
    var i;
    for(i = 0; i < alarmObj.alarmList.length; i++) {
      if(currentTime == alarmObj.alarmList[i].alarm) {
        console.log("if");
        console.log(alarmObj.alarmList);
        console.log(currentTime);
      } else {
        console.log("else");
      }
    }
  }

  const editAlarm = (alarmID) => {
    console.log("editing alarm #: " + alarmID);

    let alarmToEdit = alarmObj.alarmList.find(alarm => alarm.id == alarmID);
    dispatch({ type: 'EDIT_ALARM', alarmToEdit: alarmToEdit});
  }

  let gqlAlarms = data.alarms.map((item, index) => {
    console.log(item);
    return <li>{item.ringTime} {getDayString(item.days)} <button>Edit</button></li>
  });

  let listAlarms = alarmObj.alarmList.map((item, key) =>
                                 <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => dispatch({ type: 'REMOVE_ALARM', id: item.id})}>Remove</button><button onClick={() => editAlarm(item.id)}>Edit</button></li>);


  const testFunc = (ringTime, days) => {
    console.log("ringTime in alarmG");
    console.log(ringTime);
    console.log("days in alarmG");
    console.log(days);
  }


  return (
    <div data-testid='currentTime'>
      <AddAlarm alarmID={"blabla"} test={testFunc}/>
      <p>Current Time again: {currentTime}</p>
      <p>{checkAlarmStatus()}</p>
      <h3>Alarms Currently Set:</h3>
      <ul>{listAlarms}</ul>
      <ul>{gqlAlarms}</ul>
    </div>

  );

}
