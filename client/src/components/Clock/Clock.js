//React
import React from 'react'; 

//Stylesheet
import './Clock.css' 

export const Clock = (props) =>{
  return (
    <div id='clock'>
      <button onClick={toggleClock}>
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
};