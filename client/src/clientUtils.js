// Libraries
import axios from 'axios';

export const clientUtils = {
  fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags) {
    axios
      .get(`/api/users/${userId}/log`)
      .then(({ data }) => {
        setLog(data.reverse());
        const current = data.find((logEntry) => !logEntry.outtime);
        if (current) {
          setClockedIn(true);
          current.intimeobj = new Date(current.intimeobj);
          setCurrentClock(current);
        } else {
          setCurrentClock(clientUtils.EmptyClock);
        }
        const tags = new Set();
        data.forEach((log) => log.tags.forEach((tag) => tags.add(tag)));
        setUserTags(tags);
      })
      .catch((err) => console.log(err));
  },

  fetchUser(setUser, setCurrentRate) {
    axios
      .get('/api/users/current')
      .then(({ data }) => {
        if (data.user) {
          setUser(data.user);
          if (data.user.rate) {setCurrentRate(data.user.rate / 100); }
        }
      })
      .catch((err) => console.log(err));
  },

  clockIn(
    userId,
    setClockedIn,
    log,
    setLog,
    setCurrentClock,
    currentTags,
    currentRate,
  ) {
    axios
      .post(`/api/users/${userId}/log`, { tags: currentTags, rate: currentRate })
      .then(({ data }) => {
        const newEntry = data;
        newEntry.intimeobj = new Date(newEntry.intimeobj);
        setClockedIn(true);
        setCurrentClock(newEntry);
        const newLog = Array.from(log);
        newLog.unshift(newEntry);
        setLog(newLog);
      });
  },

  clockOut(userId, setClockedIn, setLog, setCurrentClock, setUserTags) {
    axios
      .put(`/api/users/${userId}/log`)
      .then(({ data }) => {
        setClockedIn(false);
        clientUtils.fetchLog(
          userId,
          setLog,
          setClockedIn,
          setCurrentClock,
          setUserTags,
        );
      })
      .catch((err) => console.log(err));
  },

  editLogEntry(){

  },

  createAccount(userInfo, setMode) {
    axios
      .post('api/users', userInfo)
      .then((res) => {
        if (res && res.status === 200) {
          setMode('login');
        }
      })
      .catch((err) => console.log(err));
  },

  logOut() {
    axios
      .get('/api/logout')
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  },

  EmptyClock: {
    intime: null,
    rate: null,
    tags: [],
  },
};
