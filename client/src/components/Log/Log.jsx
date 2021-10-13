//React
import React from 'react'; 

//Stylesheet
import './Log.css'
import {LogEntry} from "../LogEntry/LogEntry.jsx";

export const Log = (props) =>{
  const {log} = props;
  return (
    <div id='Log'>
      {
        log.map( entry =>{
          return(
            <LogEntry
              entry={entry}
              key={`log-entry-${entry.id}`}
            />
          )
        })
      }
    </div>
  )
};