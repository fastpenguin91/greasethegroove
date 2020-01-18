import React, { useContext, useEffect } from 'react';
import { AlarmContext } from '../contexts/AlarmContext';
import UpdateAlarmList from '../components/UpdateAlarmList';
import { CurrentTimeContext } from '../contexts/CurrentTimeContext';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import AddAlarm from './AddAlarm';

export default function AlarmG(){
  const { currentTime, timeDispatch } = useContext(CurrentTimeContext);


}

// remove this once you figure out current time context
