// React
import React from 'react';

// Stylesheet
import './LogEntryValue.css';

const LogEntryValue = ({ value}) => (
  value !== null ? (
      <div className="data-field value">
        <span>{value !== null ? `$${value / 100}` : ""}</span>
      </div>
    ) : null
);
export default LogEntryValue;
