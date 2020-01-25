import React, { createContext, useReducer } from 'react';
import gql from "graphql-tag";
import { useQuery} from "@apollo/react-hooks";
//import { currentTimeReducer } from '../reducers/currentTimeReducer';

export const AlarmsContext = createContext();

const AlarmsContextProvider = (props) => {
//  const [currentTime, timeDispatch] = useReducer(currentTimeReducer, "6:32pm");


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


  // console.log("hey yall from context");

  // console.log(data);
  return (
    <AlarmsContext.Provider value={{state: data}}>
      {props.children}

    </AlarmsContext.Provider>
  )
}

export default AlarmsContextProvider;
