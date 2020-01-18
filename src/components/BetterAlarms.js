import React, { useState, useContext, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";


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
    pollInterval: 500,
    
  });


  if (loading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return "error..." + {error};
  }

  console.log("state in alarm list???????:");
  console.log(data);

//  const [alarms, setAlarms] = useState(data);


  return (
    <div data-testid='currentTime'>
      <p>I a a little teapot</p>
      <ul>{data.alarms.map((item, index) => {
        return <li>{item.ringTime} <button>lala</button></li>
      })}</ul>
    </div>

  );

}
