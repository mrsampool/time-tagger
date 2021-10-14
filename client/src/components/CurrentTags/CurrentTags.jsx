//React
import React from 'react'; 

//Stylesheet
import './CurrentTags.css' 

export const CurrentTags = ({currentTags, setCurrentTags}) =>{

  return (
    <div id='CurrentTags'>
      <p>current tags:</p>
      {
        currentTags.length ?
          <div id='current-tags-list'>
            {
              currentTags.map( tag => {
                return <Tag tag={tag} currentTags={currentTags} setTags={setCurrentTags}/>
              })
            }
          </div> : <p>none</p>
      }
    </div>
  )
};

const Tag = ({tag, currentTags, setTags}) => {

  function removeTag(){
    setTags( currentTags.filter( currentTag => {
      return currentTag !== tag;
    }) );
  }

  return (
    <span className='tag'>
      {tag}
      <button onClick={removeTag}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="remove-tag"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
      </button>
    </span>
  )
}