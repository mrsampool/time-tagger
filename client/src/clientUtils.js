// Libraries
import axios from 'axios';

export default {

  fetchLog(setLog, setClockedIn, setCurrentClock){
    axios.get(`/api/users/${userId}/log`)
    .then( ({data}) => {
      setLog( data.reverse() );
      let current = data.find( logEntry => !logEntry.outtime );
      if (current){
        setClockedIn( true );
        setCurrentClock(current);
      } else { setCurrentClock( new this.EmptyClock() ) }
    })
    .catch( err => console.log(err) );
  },

  clockIn(userId, setClockedIn, setLog, setCurrentClock){
    axios.post(`/api/users/${userId}/log`)
    .then( ({data}) =>{
      setClockedIn(true);
      this.fetchLog(setLog, setClockedIn, setCurrentClock);
    });
  },

  clockOut(setClockedIn, setLog, setCurrentClock){
    axios.put(`/api/users/${userId}/log`)
    .then( ({data}) =>{
      setClockedIn(false);
      this.fetchLog(setLog, setClockedIn, setCurrentClock);
    })
    .catch( err => console.log(err) );
  },

  EmptyClock(){
    this.intime = null;
    this.rate = null;
    this.tags = [];
  }

};