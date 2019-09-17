import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

class Test extends React.Component {

  
}

/*
class Alarm2 extends React.Component {
//  constructor(props){

//  }
  checkAlarms() {
    i++;
    let today = new Date();
    let firstAlarm = "11:5";
    let currentTime = today.getHours() + ":" + today.getMinutes();
    if (firstAlarm == currentTime) {
      currentStatus = "Drop and give me 20 you lazy bum!";
    } else {
      currentStatus = "business as usual" + i;
      console.log(currentStatus);
    }
  }

  alarm(){
    let today = new Date();
    let firstAlarm = "10";
    return (
      <div>
        <p>Current Time: {today.getHours()}:{today.getSeconds()};</p>
        <p>Current Status is: {setInterval(returnStatus, 1000)};</p>
      </div>
    );
  }



}

var i = 0;
var currentStatus;
var a;

function checkAlarms() {
  i++;
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
setInterval(checkAlarms, 1000); */
/*
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
*/


//setInterval(checkVar, 1000);

/*function checkVar(){
  console.log("Current status is now: " + returnStatus());
}

function returnStatus(){
  return currentStatus;
  
  }*/

//export default Alarm;


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Test/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  };
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
