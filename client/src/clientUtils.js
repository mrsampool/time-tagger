// Libraries
import axios from 'axios';

export const clientUtils = {

  fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags){
    axios.get(`/api/users/${userId}/log`)
    .then( ({data}) => {
      setLog( data.reverse() );
      let current = data.find( logEntry => !logEntry.outtime );
      if (current){
        setClockedIn( true );
        setCurrentClock(current);
      } else {
        setCurrentClock( clientUtils.EmptyClock )
      }
      let tags = new Set();
      data.forEach( log => log.tags.forEach( tag => tags.add(tag) ) );
      setUserTags(tags);
    })
    .catch( err => console.log(err) );
  },

  clockIn(userId, setClockedIn, setLog, setCurrentClock, currentTags, setUserTags){
    axios.post(`/api/users/${userId}/log`,{tags: currentTags})
    .then( ({data}) =>{
      setClockedIn(true);
      clientUtils.fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags);
    });
  },

  clockOut(userId, setClockedIn, setLog, setCurrentClock, setUserTags){
    axios.put(`/api/users/${userId}/log`)
    .then( ({data}) =>{
      setClockedIn(false);
      clientUtils.fetchLog(userId, setLog, setClockedIn, setCurrentClock, setUserTags);
    })
    .catch( err => console.log(err) );
  },

  EmptyClock: {
    intime: null,
    rate: null,
    tags: [],
  }

};