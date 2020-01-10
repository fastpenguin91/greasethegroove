import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//import classNames from 'classnames';
import AlarmContextProvider from './contexts/AlarmContext';
import CurrentTimeContextProvider from './contexts/CurrentTimeContext';
import Alarm from './components/Alarm';
import UpdateAlarmList from './components/UpdateAlarmList';
import Exercises from './components/Exercises';
import Header from './components/Header';


class App extends React.Component {
  render() {
    return (
      <Router >
        <Switch>
          <div className="game">
            <CurrentTimeContextProvider >
              <AlarmContextProvider >
                <Route path="/">
                  <Header />
                  <Alarm />
                  <UpdateAlarmList />
                </Route>
                <Route path="/alarms">
                  <Header />
                  <Alarm />
                </Route>
                <UpdateAlarmList />
              </AlarmContextProvider>
            </CurrentTimeContextProvider>
          </div>
        </Switch>
      </Router >
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
