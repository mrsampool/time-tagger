// React
import React from 'react';

// Stylesheet
import './LogEntryDates.css';

const LogEntryDates = ({ indate, outdate}) => (
  <div className="data-field dates">
    <span>{indate}</span>
    {outdate !== indate ? <span>{outdate}</span> : null}
  </div>
);
export default LogEntryDates;
