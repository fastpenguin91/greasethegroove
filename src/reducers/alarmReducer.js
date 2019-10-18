
export const alarmReducer = (state, action) => {

  switch (action.type) {
  case 'REMOVE_ALARM':
    return state.filter(alarm => alarm.id !== action.id);
  case 'ADD_ALARM':
    console.log("ADD_ALARM ran!");
    return [...state, action.newAlarmList]
  default:
    return state;
  }
}
