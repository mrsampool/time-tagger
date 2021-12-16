// React
import React from 'react';

// Stylesheet
import './LogEntryNums.css';

const LogEntryNums = ({ entry }) => (
  <div className="data-field numbers">
    {
      entry && entry.outtime && entry.totaltime && entry.totaltime.length &&
      <span>{
        entry.totaltime
          .split(' ')
          .filter((section) => {
            return section.indexOf('00h') === -1 && section.indexOf('00m') === -1;
          })
          .join(' ')
      }</span>
    }
    <span>${entry.rate / 100}/hr</span>
  </div>
);
export default LogEntryNums;
