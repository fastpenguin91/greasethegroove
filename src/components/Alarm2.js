import React, { useContext, useState, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';

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

  let listAlarms = alarmState.map((item, key) =>
                                         <li key={item.id}>{item.alarm} {item.daysString} <button onClick={() => removeAlarm(item.id)}>Remove</button><button>Edit</button></li>);

  return (
    <div data-testid='currentTime'>
      {alarms}
      <ul>{listAlarms}</ul>
    </div>

  );

}
