import React, { useState, useEffect } from 'react';

export default function CurrentTime(props){

  const returnDayString = (day) => {
    var str;
    switch (day) {
    case 0:
      str = "Sunday";
      break;
    case 1:
      str = "Monday";
      break;
    case 2:
      str = "Tuesday";
      break;
    case 3:
      str = "Wednesday";
      break;
    case 4:
      str = "Thursday";
      break;
    case 5:
      str = "Friday";
      break;
    case 6:
      str = "Saturday";
      break;
    }
    return str;
  }

  const calculateTime = () => {
    let today = new Date();
    let currentTime = returnDayString(today.getDay()) + " " + today.getHours() + ":" + today.getMinutes();
    return currentTime;
  }

  const [theTime, setTime] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 30000 );
  });




  return (
    <div data-testid='currentTime'>
      Current time is: { theTime } From functional component
    </div>);
}
