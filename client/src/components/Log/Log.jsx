//React
import React, {useEffect, useState} from 'react';

// Sub-Components
import {LogEntry} from "../LogEntry/LogEntry.jsx";
import {LogSum} from "../LogSum/LogSum";

//Stylesheet
import './Log.css'

export const Log = (props) =>{
  let {log, currentTags} = props;

  let [filteredLog, setFilteredLog] = useState(log);

  useEffect( ()=>{
    console.log('updating log');
    console.log(currentTags);

    if (currentTags.length > 0){
      console.log(currentTags.length);
      setFilteredLog(log.filter( logEntry =>{
        return currentTags.every( tag => {
          return logEntry.tags.includes(tag);
        });
      }));
    } else {
      setFilteredLog(props.log);
    }
  });

  return (
    <div id='Log'>
      <LogSum log={filteredLog} />
      {
          props.log.map( entry =>{
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