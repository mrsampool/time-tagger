//React
import React from 'react'; 

//Stylesheet
import './Clock.css' 

export const Clock = (props) =>{
  const {clockedIn, currentClock, currentTags, toggleClock, setCurrentTags} = props;
  const {intime, rate, tags} = currentClock;
  return (
    <div id='clock'>
      <span>{intime || '-'}</span>
      <button onClick={toggleClock}>
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </button>
      <input list='current-tags'/>
      <datalist id='current-tags'>
        {
          currentTags.length ? currentTags.map( tag => {
            return <option value={tag}/>
          }) : null
        }
      </datalist>
    </div>
  );
};