// Libraries
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Sub-Components
import {Log} from "./components/Log/Log.jsx";
import {Clock} from "./components/Clock/Clock.jsx";
import {Auth} from "./components/Auth/Auth.jsx";

// Utilities
import {clientUtils} from "./clientUtils";
const {fetchLog, fetchUser, clockIn, clockOut, EmptyClock} = clientUtils;

// Style Sheet
import './App.css';

export const App = props => {

  const [clockedIn, setClockedIn] = useState(false);
  const [currentClock, setCurrentClock] = useState( EmptyClock );
  const [currentTags, setCurrentTags] = useState( [] );
  const [currentDlrs, setCurrentDlrs] = useState(0);

  const [log, setLog] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [user, setUser] = useState(null);

  function toggleClock(){
    if (clockedIn){
      clockOut(user.id, setClockedIn, setLog, setCurrentClock, setUserTags)
    } else {
      clockIn(user.id, setClockedIn, log, setLog, setCurrentClock, currentTags, setUserTags)
    }
  }

  function logIn(creds){
    console.log(creds);
    axios.post('/api/login', creds)
        .then(({data}) => {
          if (data.user){
            setUser(data.user);
          }
        });
  }

  useEffect( ()=>{
    if (user){
      fetchLog(user.id, setLog, setClockedIn, setCurrentClock, setUserTags);
    } else {
      fetchUser(setUser);
    }
  }, [user]);

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
      {
        user ? (
            <React.Fragment>
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
            </React.Fragment>
        ) : <Auth logIn={logIn}/>
      }

    </div>
  )
}