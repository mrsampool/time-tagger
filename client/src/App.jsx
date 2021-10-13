// Libraries
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Sub-Components
import {LogEntry} from "./components/LogEntry/LogEntry.jsx";

// Style Sheet
import './App.css';

export const App = props => {

  const [clockedIn, setClockedIn] = useState(false);
  const [userId, setUserId] = useState(1);
  const [tags, setTags] = useState([]);
  const [log, setLog] = useState([]);

  function fetchLog(){
    axios.get(`/api/users/${userId}/log`)
    .then( ({data}) => {
      setLog( data.reverse() );
      setClockedIn( data.some( logEntry => !logEntry.outtime ) );
    })
    .catch( err => console.log(err) );
  }

  function clockIn(){
    axios.post(`/api/users/${userId}/log`)
    .then( ({data}) =>{
      console.log(data);
      setClockedIn(true);
      fetchLog();
    });
  }

  function clockOut(){
    axios.put(`/api/users/${userId}/log`)
    .then( ({data}) =>{
      console.log(data);
      setClockedIn(false);
      fetchLog();
    })
    .catch( err => console.log(err) );
  }

  function toggleClock(){
    if (clockedIn){ clockOut() }
    else { clockIn() }
  }

  useEffect( ()=>{
    fetchLog();
  }, []);

  return (
    <div id='App'>
      <div id='clock'>
        <button onClick={toggleClock}>
          {clockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>
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
    </div>
  )
}