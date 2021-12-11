import React, {useState} from "react";

import './EditLog.css';
import Tagger from "../Tagger/Tagger.jsx";

const EditLog = ({ logEntry, userTags, user, setEntry }) =>{
  function parseDateTime(date,time) {
    let dateParts = date.split(' ');
    dateParts = dateParts[1].split('.');
    const year = dateParts[2];
    const month = dateParts[0];
    const day = dateParts[1];
    let timeParts = time.split(' ');
    const ampm = timeParts[1];
    timeParts = timeParts[0].split(':');
    let hour = Number(timeParts[0]);
    if (ampm === 'pm') {
      hour += 12;
    }
    const minute = timeParts[1];
    return `20${year}-${month}-${day}T${hour}:${minute}`;
  }
  function close(){
    setEntry({});
  }
  const { tags, rate, indate, outdate, intime, outtime } = logEntry;
  const [newTags, setNewTags] = useState(tags);
  const [newRate, setNewRate] = useState(rate);

  return(
    <div id="edit-log-wrap">
      <form id="edit-log">
        <h2>Edit Log Entry</h2>
        <label>
          Start
          <input type="datetime-local" defaultValue={parseDateTime(indate, intime)} />
        </label>
        <label>
          End
          <input
            type="datetime-local"
            defaultValue={
              outdate && outtime
                ? parseDateTime(outdate, outtime)
                : parseDateTime(indate, intime)
            }
          />
        </label>
        <Tagger
          currentTags={newTags}
          tagSetter={setNewTags}
          currentRate={newRate}
          setCurrentRate={setNewRate}
          userTags={userTags}
          inputId="edit-add-tags"
          user={user}
        />
        <button type="button">Save Changes</button>
        <button type="button" className="red" onClick={close}>Cancel</button>
      </form>
    </div>
  );
};
export default EditLog;