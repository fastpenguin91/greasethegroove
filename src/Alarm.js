import React from 'react';
import logo from './logo.svg';
import './App.css';

function Alarm() {
  let today = new Date();
  return (
    <div>
      <p>Set an alarm here: Woo good job!! {Date(Date.now()).toString()};</p>
      <p>Set an alarm here: Woo good job!! {today.getHours()}:{today.getMinutes()};</p>
    </div>
  );
}


export default Alarm;
