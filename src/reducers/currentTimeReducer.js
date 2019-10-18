
export const currentTimeReducer = (state, action) => {

  switch (action.type) {
  case 'GET_CURRENT_TIME':
    let today = new Date();

    return today.toDateString() + " " + today.getHours() + ":" + today.getMinutes();
  default:
    return state;
  }
}
