import React, { useContext, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';


export default function Alarm2(){
  const { currentTime, timeDispatch } = useContext(CurrentTimeContext);
  const { alarmObj, dispatch } = useContext(AlarmContext);

  useEffect(() => {
    setInterval(() => {
      timeDispatch({ type: 'GET_CURRENT_TIME'});
    }, 1000);
  });

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

  let listAlarms = alarmObj.alarmList.map((item, key) =>
                                 <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => dispatch({ type: 'REMOVE_ALARM', id: item.id})}>Remove</button><button onClick={() => editAlarm(item.id)}>Edit</button></li>);

  return (
    <div data-testid='currentTime'>
      <p>Current Time: {currentTime}</p>
      <p>{checkAlarmStatus()}</p>
      <h3>Alarms Currently Set:</h3>
      <ul>{listAlarms}</ul>
    </div>

  );

}
