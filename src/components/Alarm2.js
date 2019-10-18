import React, { useContext, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';


export default function Alarm2(){
  const { currentTime, timeDispatch } = useContext(CurrentTimeContext);
  const { alarmList, dispatch } = useContext(AlarmContext);

  useEffect(() => {
    setInterval(() => {
      timeDispatch({ type: 'GET_CURRENT_TIME'});
    }, 1000);
  });

  let listAlarms = alarmList.map((item, key) =>
                                          <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => dispatch({ type: 'REMOVE_ALARM', id: item.id})}>Remove</button><button>Edit</button></li>);

  return (
    <div data-testid='currentTime'>
      <p>The final form!</p>
      <UpdateAlarmList />
      <p>Current Time: {currentTime}</p>
      <h3>Alarms Currently Set:</h3>
      <ul>{listAlarms}</ul>

    </div>

  );

}
