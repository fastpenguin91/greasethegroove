import React from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REMOVE_ALARM = gql`
    mutation RemoveAlarm($id: ID!) {
      deleteAlarm(id: $id) {
        id
      }
    }
  `;

export default function RemoveAlarm(props){

  const [removeAlarm, { data }] = useMutation(REMOVE_ALARM);

  function handleRemove(){
    console.log("removed");
    removeAlarm({ variables: {id: props.alarmID}})
  }


  return (
    <button onClick={handleRemove}>REMOVE</button>
  );
}
