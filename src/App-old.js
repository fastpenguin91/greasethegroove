import React from 'react';
import logo from './logo.svg';
import './App.css';
import Alarm from './Alarm.js';

class App extends React.Component {
  return (
    <div className="App">
      <header className="App-header">
        <Alarm/>
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
  );
}

export default App;
