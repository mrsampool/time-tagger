// React
import React from 'react';

// Stylesheet
import './LogEntryTimes.css';

const LogEntryTimes = ({ intimeObj, outtimeObj }) => (
    <div className="data-field times">
      <span>{new Date(intimeObj).toLocaleTimeString()}</span>
      <span className="out-time">{
        outtimeObj
          ? new Date(outtimeObj).toLocaleTimeString()
          : "CURRENT"
      }</span>
    </div>
);
export default LogEntryTimes;
