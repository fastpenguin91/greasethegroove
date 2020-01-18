import React, {Component, useContext, useEffect, useState } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "./Checkbox.js";

// const REMOVE_ALARM = gql`
//     mutation {
//       deleteAlarm(id: "ck55v3gqemo1x0b00kizmcju2") {
//         id
//       }
//     }
//   `;

const REMOVE_ALARM = gql`
    mutation RemoveAlarm($id: ID!) {
      deleteAlarm(id: $id) {
        id
      }
    }
  `;

export default function RemoveAlarm(props){

//    const { loading, error, data } = useMutation(REMOVE_ALARM);

  const [removeAlarm, { data }, refetch] = useMutation(REMOVE_ALARM);

  function handleRemove(){
    console.log("removed");
    removeAlarm({ variables: {id: props.alarmID}})
    
  }


  return (
    <button onClick={handleRemove}>REMOVE</button>
  );
}
