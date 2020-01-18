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
import AlarmG from './components/AlarmG';
import UpdateAlarmList from './components/UpdateAlarmList';
import Exercises from './components/Exercises';
import Header from './components/Header';
import AlarmList from './components/AlarmList';
import AddAlarm from './components/AddAlarm';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  //uri: 'https://us1.prisma.sh/fastpenguin91-c6edf8/gtg/dev'
  uri: 'https://aqueous-cove-86488.herokuapp.com/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});



class App extends React.Component {
  render() {
    return (
      <Router >
        <Switch>
          <div className="game">
            <CurrentTimeContextProvider >
              <Route path="/">
                <Header />
              </Route>
              <Route exact path="/alarms">
                <AddAlarm />
                <AlarmList />
              </Route>
            </CurrentTimeContextProvider>
          </div>
        </Switch>
      </Router >
    );
  }
}

// ========================================

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
