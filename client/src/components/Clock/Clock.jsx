// React
import React from 'react';

// Sub-Components
import { RateInput } from '../RateInput/RateInput.jsx';

// Stylesheet
import './Clock.css';
import { CurrentTags } from '../CurrentTags/CurrentTags.jsx';

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
  const { intime, rate, tags } = currentClock;

  function addTag(e) {
    e.preventDefault();
    const tagInput = document.getElementById('add-tag');
    let newTag = tagInput.value;
    if (user && user.first_name === 'demo') {
      newTag = newTag.replaceAll(/shit|piss|fuck|ass|cunt|wanker|motherfucker|bastard|dick|dickhead|cock|pussy|punani|twat|prick|tit|bitch/gi, '****');
      console.log(newTag);
    }
    const tagSet = new Set(currentTags);
    tagSet.add(newTag);
    setCurrentTags([...tagSet]);
    tagInput.value = '';
  }

  return (
    <div id="Clock">
      <h1 id="logo">TimeTagger</h1>
      <CurrentTags currentTags={currentTags} setCurrentTags={setCurrentTags} />
      <form onSubmit={addTag}>
        <input
          id="add-tag"
          list="current-tags"
          placeholder="write a tag for your time..."
        />
        <div id="clock-adjusters">
          <button>add tag</button>
          <RateInput currentRate={currentRate} setCurrentRate={setCurrentRate} />
        </div>
        <datalist id="current-tags">
          {userTags.size
            ? [...userTags].map((tag) =>
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={tag} key={`userTag${tag}`} />)
            : null}
        </datalist>
      </form>
      <button onClick={toggleClock} id={clockedIn ? 'clock-out' : 'clock-in'}>
        {clockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
      </button>
      <div className={`clocked-since ${clockedIn ? 'in' : 'out'}`}>
        <p className="clocked-time-label">clocked in since:</p>
        <div>
          <span id="clocked-time">{intime || '-'}</span>
          <span id="clocked-dlrs">{currentDlrs || '-'}</span>
        </div>
      </div>
    </div>
  );
};
