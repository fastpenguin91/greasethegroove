import React from 'react';
import './App.css';
// Figure out why undo goes so far back

var currentStatus;
var a;

function checkAlarms() {
  let today = new Date();
  let firstAlarm = "11:5";
  let currentTime = today.getHours() + ":" + today.getMinutes();
  if (firstAlarm == currentTime) {
    currentStatus = "Drop and give me 20 you lazy bum!";
  } else {
    currentStatus = "business as usual..." + i;
    console.log(currentStatus);
  }

}
setInterval(checkAlarms, 1000);

function Alarm() {

  let today = new Date();
  let firstAlarm = "10";
  return (
    <div>
      <p>Current Time: {today.getHours()}:{today.getSeconds()};</p>
      <p>Current status is: {setInterval(returnStatus, 1000)};</p>
    </div>
  );
}

var i = 0;

function changeA(){
  i++;
  a = "cat" + i;
  console.log(a);
  console.log(currentStatus);
}
setInterval(changeA, 1000);

setInterval(checkVar, 1000);

function checkVar(){
  console.log("cat is now... " + a);
  console.log("Current status is now: " + returnStatus());
}

function returnStatus(){
  return currentStatus;
  
}

export default Alarm;
