import React, { createContext, useReducer } from 'react';
import { currentTimeReducer } from '../reducers/currentTimeReducer';

export const CurrentTimeContext = createContext();

const CurrentTimeContextProvider = (props) => {
  const [currentTime, timeDispatch] = useReducer(currentTimeReducer, "6:32pm");

  return (
    <CurrentTimeContext.Provider value={{ currentTime, timeDispatch}}>
      {props.children}

    </CurrentTimeContext.Provider>
  )
}

export default CurrentTimeContextProvider;
