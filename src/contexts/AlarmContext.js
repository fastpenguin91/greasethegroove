import React, { createContext, useReducer } from 'react';
import { alarmReducer } from '../reducers/alarmReducer';

export const AlarmContext = createContext();

const AlarmContextProvider = (props) => {
  const [alarmObj, dispatch] = useReducer(
    alarmReducer,
    {
      alarmList: [
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
      alarmToEdit: {id: '', checkboxGroup: [], thetime: ''},
    }
  );

  return (
    <AlarmContext.Provider value={{ alarmObj, dispatch }}>
      {props.children}
    </AlarmContext.Provider>
  );
}

export default AlarmContextProvider;
