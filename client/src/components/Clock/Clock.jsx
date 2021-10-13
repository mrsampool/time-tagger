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
      <span>{intime || '-'}</span>
      <button onClick={toggleClock}>
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </button>
      {
        currentTags.length ? currentTags.map( tag => {
          return <span>{tag}</span>
        }) : null
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