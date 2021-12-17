// React
import React from 'react';

// Stylesheet
import './Warn.css';

const Warn = ({ message, setMessage }) => (
  <p className={`warn ${!!message}`}>
    {message}
    <button type="button" onClick={()=>{setMessage('')}}>OK</button>
  </p>
);
export default Warn;
