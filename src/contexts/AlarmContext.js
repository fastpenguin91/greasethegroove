import React, { createContext, useReducer } from 'react';
import { alarmReducer } from '../reducers/alarmReducer';

export const AlarmContext = createContext();

const AlarmContextProvider = (props) => {
  const [alarmList, dispatch] = useReducer(alarmReducer, 
    [
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
    ],
  );

  return (
    <AlarmContext.Provider value={{ alarmList, dispatch }}>
      {props.children}
    </AlarmContext.Provider>
  );
}

export default AlarmContextProvider;
