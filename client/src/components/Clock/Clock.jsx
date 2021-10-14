//React
import React from 'react'; 

//Stylesheet
import './Clock.css'
import {CurrentTags} from "../CurrentTags/CurrentTags.jsx";

export const Clock = (props) =>{

  const {clockedIn, currentClock, currentTags, setCurrentClock, setCurrentTags, toggleClock, userTags} = props;
  const {intime, rate, tags} = currentClock;

  function addTag(e){
    e.preventDefault();
    let tags = new Set(currentTags);
    tags.add(document.getElementById('add-tag').value);
    setCurrentTags([...tags]);
  }

  return (
    <div id='Clock'>
      <h1 id='logo'>TimeTagger</h1>
      <CurrentTags currentTags={currentTags} setCurrentTags={setCurrentTags}/>
      <form onSubmit={addTag}>
        <input id='add-tag' list='current-tags' placeholder='write a tag for your time...'/>
        <button>add tag</button>
        <datalist id='current-tags'>
          {
            userTags.size ? [...userTags].map( tag => {
              return <option value={tag}/>
            }) : null
          }
        </datalist>
      </form>
      {
        clockedIn ?
          <React.Fragment>
            <p className='clocked-time-label'>clocked in since:</p>
            <span id='clocked-time'>{intime || '-'}</span>
          </React.Fragment> : null
      }
      <button onClick={toggleClock} id={clockedIn ? 'clock-out' : 'clock-in'}>
        {clockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
      </button>
    </div>
  );
};