// Libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Sub-Components
import { Log } from "./components/Log/Log.jsx";
import { Clock } from "./components/Clock/Clock.jsx";
import { Auth } from "./components/Auth/Auth.jsx";
import { User } from "./components/User/User.jsx";

// Utilities
import { clientUtils } from "./clientUtils";
const { fetchLog, fetchUser, clockIn, clockOut, EmptyClock, createAccount } =
  clientUtils;

// Style Sheet
import "./App.css";

export const App = (props) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentClock, setCurrentClock] = useState(EmptyClock);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentDlrs, setCurrentDlrs] = useState(0);
  const [currentRate, setCurrentRate] = useState(50);

  const [log, setLog] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [user, setUser] = useState(null);

  function toggleClock() {
    if (clockedIn) {
      clockOut(user.id, setClockedIn, setLog, setCurrentClock, setUserTags);
    } else {
      clockIn(
        user.id,
        setClockedIn,
        log,
        setLog,
        setCurrentClock,
        currentTags,
        currentRate
      );
    }
  }

  function logIn(creds, errorCb) {
    axios.post("/api/login", creds)
      .then(({data}) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => { if (errorCb) { errorCb() }});
    ;
  }

  function logOut() {
    console.log("logOut");
    axios
      .get(`/api/logout`)
      .then((data) => {
        console.log(data);
        setUser(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (user) {
      fetchLog(user.id, setLog, setClockedIn, setCurrentClock, setUserTags);
    } else {
      fetchUser(setUser, setCurrentRate);
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentClock.intimeobj) {
        setCurrentDlrs(
          `$${(((new Date() - currentClock.intimeobj) / 3600000) * 50).toFixed(
            2
          )}`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div id="App">
      {user ? (
        <React.Fragment>
          <User user={user} logOut={logOut} />
          <Clock
            clockedIn={clockedIn}
            currentClock={currentClock}
            currentTags={currentTags}
            currentDlrs={currentDlrs}
            currentRate={currentRate}
            userTags={userTags}
            setCurrentClock={setCurrentClock}
            setCurrentTags={setCurrentTags}
            setCurrentRate={setCurrentRate}
            toggleClock={toggleClock}
          />
          <Log log={log} currentTags={currentTags} />
        </React.Fragment>
      ) : (
        <Auth logIn={logIn} createAccount={createAccount} setUser={setUser} />
      )}
    </div>
  );
};
