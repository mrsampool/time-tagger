//React
import React from 'react'; 

//Stylesheet
import './Log.css'
import {LogEntry} from "../LogEntry/LogEntry";

export const Log = (props) =>{
  return (
    <div id='log'>
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