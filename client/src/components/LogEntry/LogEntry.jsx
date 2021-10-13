//React
import React from 'react'; 

//Stylesheet
import './LogEntry.css';

export const LogEntry = (props) =>{
  const {entry} = props;
  return(
    <div className='log-entry'>
      <div className='data-field dates'>
        <span>{entry.indate}</span>
        {
          entry.outdate !== entry.indate ?
            <span>{entry.outdate}</span> : null
        }
      </div>
      <div className='data-field times'>
        <span>{entry.intime}</span>
        <span>{entry.outtime || 'CURRENT'}</span>
      </div>
      <div className='data-field numbers'>
        <span>{entry.totaltime}</span>
        <span>${entry.rate / 100}/hr</span>
      </div>
      <div className='data-field value'>
        <span>{entry.value !== null ? `$${entry.value / 100}`:''}</span>
      </div>
    </div>
  )
};