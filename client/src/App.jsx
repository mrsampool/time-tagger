// Libraries
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Sub-Components
import {LogEntry} from "./components/LogEntry/LogEntry.jsx";

// Style Sheet
import './App.css';

export const App = props => {
  const [userId, setUserId] = useState(1);
  const [tags, setTags] = useState([]);
  const [log, setLog] = useState([]);
  function fetchLog(){
    axios.get(`/api/users/${userId}/log`)
    .then( ({data}) => setLog( data ) )
    .catch( err => console.log(err) );
  }
  useEffect( ()=>{
    fetchLog();
  }, []);
  return (
    <div id='App'>
      <button>Clock In</button>
      <div id='log'>
        {
          log.map( entry =>{
            return(
              <LogEntry
                entry={entry}
                key={`log-entry-${entry.key}`}
              />
              )
          })
        }
      </div>
    </div>
  )
}