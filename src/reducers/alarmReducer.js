
export const alarmReducer = (state, action) => {

  switch (action.type) {
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
