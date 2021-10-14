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
  const [currentDlrs, setCurrentDlrs] = useState(0);

  const [log, setLog] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [userId, setUserId] = useState(1);

  function toggleClock(){
    if (clockedIn){
      clockOut(userId, setClockedIn, setLog, setCurrentClock, setUserTags)
    } else {
      clockIn(userId, setClockedIn, log, setLog, setCurrentClock, currentTags, setUserTags)
    }
  }

  useEffect( ()=>{
    fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags);
  }, []);

  useEffect( ()=>{
    const interval = setInterval( ()=>{
      if (currentClock.intimeobj){
        console.log( new Date() - currentClock.intimeobj );
        setCurrentDlrs(
          `$${( ((new Date() - currentClock.intimeobj) / 3600000) * 50 ).toFixed(2)}`
        )
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div id='App'>
      <Clock
        clockedIn={clockedIn}
        currentClock={currentClock}
        currentTags={currentTags}
        currentDlrs={currentDlrs}
        userTags={userTags}
        setCurrentClock={setCurrentClock}
        setCurrentTags={setCurrentTags}
        toggleClock={toggleClock}
      />
      <Log log={log} currentTags={currentTags}/>
    </div>
  )
}