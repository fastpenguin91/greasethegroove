import React from 'react';
import ReactDOM from 'react-dom';
//import classNames from 'classnames';
//import Basic from './form.js';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
//import CurrentTime from './CurrentTime';
import AlarmContextProvider from './contexts/AlarmContext';
import CurrentTimeContextProvider from './contexts/CurrentTimeContext';
//import { AlarmContext } from './contexts/AlarmContext';
//import CheckboxGroup from './components/CheckboxGroup';
//import Checkbox from './components/Checkbox';
import Alarm2 from './components/Alarm2';
//import Alarm from './components/Alarm';
import UpdateAlarmList from './components/UpdateAlarmList';




class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <CurrentTimeContextProvider >
            <AlarmContextProvider >
              <Alarm2 />
              <UpdateAlarmList />
              <p> --------- Class alarm below this line --------</p>
            </AlarmContextProvider>
          </CurrentTimeContextProvider>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
