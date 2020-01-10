import React from 'react';
import '../styles/app.css';
import '../styles/header.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Header() {
  return (<div class="header">
            <span>Exercise History</span>
            <Link to="/alarms">Alarms</Link>
          <span>Alarms</span>
          </div>)
}
