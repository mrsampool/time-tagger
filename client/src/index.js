// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Parent Component
import { App } from "./App.jsx";

// Global Style Sheets
import './globalStyles/reset.css';
import './globalStyles/text.css';
import './globalStyles/elements.css';
import './globalStyles/colors.css';

const root = document.getElementById('root');

ReactDOM.render(
  <App/>,
  root
);