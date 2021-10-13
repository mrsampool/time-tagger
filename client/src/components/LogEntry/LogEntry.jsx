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
        <span>{entry.out_time}</span>
      </div>
      <div className='data-field numbers'>
        <span>{entry['total_time']}</span>
        <span>${entry.rate}</span>
      </div>
    </div>
  )
};