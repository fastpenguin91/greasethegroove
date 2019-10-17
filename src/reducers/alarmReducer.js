import uuid from 'uuid/v4';

export const alarmReducer = (state, action) => {
  var newAlarmState;

  switch (action.type) {
  case 'ADD_BOOK':
    return [...state, {
      title: action.book.title,
      author: action.book.author,
      id: uuid()}
           ]
  case 'REMOVE_BOOK':
    return state.filter(book => book.id !== action.id);
  default:
    return state;
  case 'GET_CURRENT_TIME':
    let today = new Date();
    let alarmList = state.alarmList;

    let newState = {
      currentTime: today.toDateString() + " " + today.getHours() + ":" + today.getMinutes(),
      alarmList: alarmList,
    };
    return newState;
  case 'REMOVE_ALARM':
    console.log("Just removed this alarm via alarmReducer:");
    console.log(action.id);

    let newAlarmList = state.alarmList.filter(alarm => alarm.id !== action.id);

    newAlarmState = {
      currentTime: state.currentTime,
      alarmList: newAlarmList,
    };

    return newAlarmState;

  case 'ADD_ALARM':

    console.log("ADD_ALARM ran!");

    newAlarmState = {
      currentTime: state.currentTime,
      alarmList: [...state.alarmList, action.newAlarmObj]
    };

    return newAlarmState;
  }
}
