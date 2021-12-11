// Libraries
import React, {useState, useContext} from "react";

// Sub-Components
import Tagger from "../Tagger/Tagger.jsx";

// Utils / Context
import {clientUtils} from "../../clientUtils";
import AppContext from "../../AppContext.jsx";

// Stylesheet
import './EditLog.css';

const EditLog = ({ logEntry, userTags, user, setEntry }) =>{
  const { log, setLog, setEditLogEntry } = useContext(AppContext);
  const { tags, rate, indate, outdate, intime, outtime } = logEntry;
  const [newTags, setNewTags] = useState(tags);
  const [newRate, setNewRate] = useState(rate);
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
  function handleSubmit(e) {
    e.preventDefault();
    const submission = {
      intime: document.getElementById('input-intime').value.replace('T', ' '),
      outtime: document.getElementById('input-outtime').value.replace('T', ' '),
      rate: 10,
    };
    console.log(submission);
    clientUtils.editLogEntry(user.id, logEntry.id, submission, log, setLog, setEditLogEntry);
  }
  function close(){
    setEntry({});
  }

  return(
    <div id="edit-log-wrap">
      <div id="edit-log">
        <h2>Edit Log Entry</h2>
        <label>
          Start
          <input id="input-intime" type="datetime-local" defaultValue={parseDateTime(indate, intime)} />
        </label>
        <label>
          End
          <input
            id="input-outtime"
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
        <button type="button" onClick={handleSubmit}>Save Changes</button>
        <button type="button" className="red" onClick={close}>Cancel</button>
      </div>
    </div>
  );
};
export default EditLog;