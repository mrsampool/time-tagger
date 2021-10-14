//React
import React from 'react'; 

//Stylesheet
import './LogSum.css'

export const LogSum = (props) =>{
  const {log} = props;
  return(
    <div id='LogSum'>
      <span>
        {
          `Previous: $${log.reduce( (acc, entry) => acc + entry.value, 0 ) / 100}`
        }
      </span>
    </div>
  )
};