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

  editLogEntry(userId, logId, entry, log, setLog, setEditLogEntry, setCurrentClock){
    axios
      .put(`/api/users/${userId}/log/${logId}`, { entry })
      .then(({data}) => {
        let newLog = log;
        newLog[log.findIndex(entry => entry.id === logId)] = data;
        setLog(newLog);
        if (!data.outtimeobj){
          setCurrentClock(data);
        }
        setEditLogEntry({});
      })
      .catch((err) => console.log(err));
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

  pad: function pad(num){
    return num.toString().length < 2
      ? `0${num}`
      : `${num}`
  },

  parseDate: function parseDate(date) {
    let dateParts = date.split(' ');
    dateParts = dateParts[1].split('.');
    const year = dateParts[2];
    const month = clientUtils.pad(dateParts[0]);
    const day = clientUtils.pad(dateParts[1]);
    const compiled = `20${year}-${month}-${day}`;
    return compiled;
  },

  parseTime: function parseTime(time) {
    let timeParts = time.split(' ');
    const ampm = timeParts[1];
    timeParts = timeParts[0].split(':');
    let hour = Number(timeParts[0]);
    if (ampm === 'pm') {
      hour += 12;
    }
    hour = clientUtils.pad(hour);
    const minute = clientUtils.pad(timeParts[1]);
    const compiled = `${hour}:${minute}`;
    return compiled;
  },

  compileDTstring: function compileDateTimeString(dateString, timeString){
    let dtObj = new Date(`${dateString} ${timeString}`);
    return `${
      dtObj.getFullYear()
    }-${
      clientUtils.pad(dtObj.getMonth() + 1)
    }-${
      clientUtils.pad(dtObj.getDate())
    } ${
      clientUtils.pad(dtObj.getHours())
    }:${
      clientUtils.pad(dtObj.getMinutes())
    }:${
      clientUtils.pad(dtObj.getSeconds())
    } ${
      -(dtObj.getTimezoneOffset() / 60)
    }:00`
  },

  EmptyClock: {
    intime: null,
    rate: null,
    tags: [],
  },
};
