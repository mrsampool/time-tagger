// Libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Sub-Components
import { Log } from "./components/Log/Log.jsx";
import { Clock } from "./components/Clock/Clock.jsx";
import { Auth } from "./components/Auth/Auth.jsx";
import { User } from "./components/User/User.jsx";

// Context
import AppContext from "./AppContext.jsx";

// Utilities
import { clientUtils } from "./clientUtils";
const { fetchLog, fetchUser, clockIn, clockOut, EmptyClock, createAccount } =
  clientUtils;

// Style Sheet
import "./App.css";
import EditLog from "./components/EditLog/EditLog.jsx";

export const App = (props) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentClock, setCurrentClock] = useState(EmptyClock);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentDlrs, setCurrentDlrs] = useState(0);
  const [currentRate, setCurrentRate] = useState(50);
  const [editLogEntry, setEditLogEntry] = useState({
    /*
    id: 1,
    indate: 'Fri 12.10.21',
    intime: '1:20 pm',
    tags: [],
    rate: 5000,
     */
  });

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
    axios
      .get(`/api/logout`)
      .then((data) => {
        setUser(null);
        setCurrentTags([]);
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
          `$${(((new Date() - new Date(currentClock.intimeobj)) / 3600000) * 50).toFixed(
            2
          )}`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div id="App">
      <AppContext.Provider value={{ user, setUser, log, setLog, setEditLogEntry }}>
        {user ? (
          <React.Fragment>
            {
              editLogEntry && editLogEntry.id &&
              <EditLog
                logEntry={editLogEntry}
                userTags={userTags}
                user={user}
                setEntry={setEditLogEntry}
                setCurrentClock={setCurrentClock}
              />
            }

            <User user={user} logOut={logOut} />
            <Clock
              clockedIn={clockedIn}
              currentClock={currentClock}
              currentTags={currentTags}
              currentDlrs={currentDlrs}
              currentRate={currentRate}
              userTags={userTags}
              user={user}
              setCurrentClock={setCurrentClock}
              setCurrentTags={setCurrentTags}
              setCurrentRate={setCurrentRate}
              toggleClock={toggleClock}
            />
            <Log
              log={log}
              currentTags={currentTags}
              editEntry={setEditLogEntry}
            />
          </React.Fragment>
        ) : (
          <Auth logIn={logIn} createAccount={createAccount} setUser={setUser} />
        )}
      </AppContext.Provider>
    </div>
  );
};
