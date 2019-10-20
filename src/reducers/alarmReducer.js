
export const alarmReducer = (state, action) => {

  switch (action.type) {
  case 'REMOVE_ALARM':
    return state.filter(alarm => alarm.id !== action.id);
  case 'ADD_ALARM':
    let newState;
    // test to see if this is a new alarm or an existing one being edited.
    // Pass in newAlarm via action.newAlarm. If newAlarm's id already exists in the state then it's being edited.
    if(state.alarmList.filter(alarm => alarm.id == action.alarmVals.id).length > 0) {
      let filteredList = state.alarmList.filter(alarm => alarm.id !== action.alarmVals.id);
      newState = {
        alarmList: [...filteredList, action.alarmVals],
        alarmToEdit: state.alarmToEdit,
      };
    } else {
      newState = {
        alarmList: [...state.alarmList, action.alarmVals],
        alarmToEdit: state.alarmToEdit,
      }
    }

    return newState;
  case 'EDIT_ALARM':

    let editedAlarm = {
      id: action.alarmToEdit.id,
      checkboxGroup: action.alarmToEdit.days,
      thetime: action.alarmToEdit.alarm,
    };

    return {alarmList: state.alarmList, alarmToEdit: editedAlarm };
  default:
    return state;
  }
}