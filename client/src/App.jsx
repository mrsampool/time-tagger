// Libraries
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Sub-Components
import {Log} from "./components/Log/Log.jsx";
import {Clock} from "./components/Clock/Clock.jsx";

// Utilities
import clientUtils from "./clientUtils";
const {fetchLog, clockIn, clockOut, EmptyClock} = clientUtils;

// Style Sheet
import './App.css';

export const App = props => {

  const [clockedIn, setClockedIn] = useState(false);
  const [currentClock, setCurrentClock] = useState( new EmptyClock() );
  const [currentTags, setCurrentTags] = useState([]);

  const [log, setLog] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [userId, setUserId] = useState(1);

  function toggleClock(){
    if (clockedIn){ clockOut(setClockedIn, fetchLog, setLog, setCurrentClock) }
    else { clockIn(userId, setClockedIn, setLog, setCurrentClock) }
  }

  useEffect( ()=>{
    fetchLog(setLog, setClockedIn, setCurrentClock);
  }, []);

  return (
    <div id='App'>
      <Clock
        clockedIn={clockedIn}
        currentClock={currentClock}
        currentTags={currentTags}
        setCurrentTags={setCurrentTags}
        toggleClock={toggleClock}
      />
      <Log log={log} />
    </div>
  )
}