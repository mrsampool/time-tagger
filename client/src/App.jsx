// Libraries
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Sub-Components
import {Log} from "./components/Log/Log.jsx";
import {Clock} from "./components/Clock/Clock.jsx";

// Utilities
import {clientUtils} from "./clientUtils";
const {fetchLog, clockIn, clockOut, EmptyClock} = clientUtils;

// Style Sheet
import './App.css';

export const App = props => {

  const [clockedIn, setClockedIn] = useState(false);
  const [currentClock, setCurrentClock] = useState( EmptyClock );
  const [currentTags, setCurrentTags] = useState( [] );

  const [log, setLog] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [userId, setUserId] = useState(1);

  function toggleClock(){
    if (clockedIn){
      clockOut(userId, setClockedIn, setLog, setCurrentClock, setUserTags)
    } else {
      clockIn(userId, setClockedIn, setLog, setCurrentClock, currentTags, setUserTags)
    }
  }

  useEffect( ()=>{
    fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags);
  }, []);

  return (
    <div id='App'>
      <Clock
        clockedIn={clockedIn}
        currentClock={currentClock}
        currentTags={currentTags}
        userTags={userTags}
        setCurrentClock={setCurrentClock}
        setCurrentTags={setCurrentTags}
        toggleClock={toggleClock}
      />
      <Log log={log} currentTags={currentTags}/>
    </div>
  )
}