// React
import React from 'react';

// Stylesheet
import './LogEntryTimes.css';

const LogEntryTimes = ({ intime, outtime }) => (
  <div className="data-field times">
    <span>{intime}</span>
    <span className="out-time">{outtime || "CURRENT"}</span>
  </div>
);
export default LogEntryTimes;
