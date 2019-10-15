import React, { createContext, useReducer } from 'react';
import { alarmReducer } from '../reducers/alarmReducer';

export const AlarmContext = createContext();

const AlarmContextProvider = (props) => {
  const [alarms, dispatch] = useReducer(alarmReducer, "6:32pm");
  return (
    <AlarmContext.Provider value={{ alarms, dispatch }}>
      {props.children}
    </AlarmContext.Provider>
  );
}

export default AlarmContextProvider;
