//React
import React from 'react'; 

//Stylesheet
import './Clock.css' 

export const Clock = (props) =>{

  const {clockedIn, currentClock, currentTags, setCurrentClock, setCurrentTags, toggleClock, userTags} = props;
  const {intime, rate, tags} = currentClock;

  function addTag(e){
    e.preventDefault();
    let tags = new Set(currentTags);
    tags.add(document.getElementById('add-tag').value);
    console.log(tags);
    setCurrentTags([...tags]);
  }

  return (
    <div id='Clock'>
      <h1 id='logo'>TimeTagger</h1>
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
        {
          currentTags.length ?
            <div id='current-tags'>
              {
                currentTags.map( tag => {
                  return <span className='tag'>{tag}</span>
                })
              }
            </div> : null
        }
      <form onSubmit={addTag}>
        <input id='add-tag' list='current-tags'/>
        <button>Add Tag</button>
        <datalist id='current-tags'>
          {
            userTags.size ? [...userTags].map( tag => {
              return <option value={tag}/>
            }) : null
          }
        </datalist>
      </form>
    </div>
  );
};