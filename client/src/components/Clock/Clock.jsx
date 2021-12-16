// React
import React from 'react';

// Sub-Components
import { CurrentTags } from '../CurrentTags/CurrentTags.jsx';
import Tagger from "../Tagger/Tagger.jsx";
import { RateInput } from '../RateInput/RateInput.jsx';

// Stylesheet
import './Clock.css';


export var Clock = function ({
  clockedIn,
  currentClock,
  currentTags,
  currentDlrs,
  currentRate,
  setCurrentTags,
  setCurrentRate,
  toggleClock,
  userTags,
  user
}) {
  const { intime, rate, tags, intimeobj } = currentClock;

  return (
    <div id="Clock">
      <h1 id="logo">TimeTagger</h1>
      <Tagger
          currentTags={currentTags}
          tagSetter={setCurrentTags}
          currentRate={currentRate}
          setCurrentRate={setCurrentRate}
          userTags={userTags}
          inputId="add-tag"
          user={user}
      />
      <button onClick={toggleClock} id={clockedIn ? 'clock-out' : 'clock-in'}>
        {clockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
      </button>
      <div className={`clocked-since ${clockedIn ? 'in' : 'out'}`}>
        <p className="clocked-time-label">clocked in since:</p>
        <div>
          <span id="clocked-time">{
            intimeobj
            ? intimeobj.toLocaleTimeString()
            : '-'
          }</span>
          <span id="clocked-dlrs">{currentDlrs || '-'}</span>
        </div>
      </div>
    </div>
  );
};
