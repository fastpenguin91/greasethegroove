import uuid from 'uuid/v4';

export const alarmReducer = (state, action) => {
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
    //    let currentTime = "day: " + today.getDay() + " hour: " + today.getHours() + "Min:" + today.getMinutes() + "seconds: " + today.getSeconds();

    return today.toDateString() + " " + today.getHours() + ":" + today.getMinutes();
  }
} 
