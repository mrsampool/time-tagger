// Libraries
import React, {useState, useContext} from "react";

// Sub-Components
import Tagger from "../Tagger/Tagger.jsx";

// Utils / Context
import {clientUtils} from "../../clientUtils";
const {pad, parseDate, parseTime, editLogEntry, compileDTstring} = clientUtils;
import AppContext from "../../AppContext.jsx";

// Stylesheet
import './EditLog.css';

const EditLog = ({ logEntry, userTags, user, setEntry, setCurrentClock }) =>{
  const { log, setLog, setEditLogEntry } = useContext(AppContext);
  const { tags, rate, indate, outdate, intime, outtime } = logEntry;
  const [newTags, setNewTags] = useState(tags);
  const [newRate, setNewRate] = useState(rate);

  function handleSubmit(e) {
    e.preventDefault();
    const inDT = compileDTstring(
      document.getElementById('input-indate').value,
      document.getElementById('input-intime').value
    );
    const submission = {
      // '2020-12-12 7:15:21 -10:00'
      intime: compileDTstring(
        document.getElementById('input-indate').value,
        document.getElementById('input-intime').value
      ),
      outtime: outtime ? compileDTstring(
        document.getElementById('input-outdate').value,
        document.getElementById('input-outtime').value
      ) : null,
      rate: 10,
    };
    editLogEntry(user.id, logEntry.id, submission, log, setLog, setEditLogEntry, setCurrentClock);
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
          {/* <input id="input-intime" type="datetime-local" defaultValue={parseDateTime(indate, intime)} /> */}
          <input id="input-indate" type="date" defaultValue={parseDate(indate)}/>
          <input id="input-intime" type="time" defaultValue={parseTime(intime)}/>
        </label>
        {
          outtime && (
            <label>
              End
              {/* <input id="input-intime" type="datetime-local" defaultValue={parseDateTime(indate, intime)} /> */}
              <input id="input-outdate" type="date" defaultValue={parseDate(outdate)}/>
              <input id="input-outtime" type="time" defaultValue={parseTime(outtime)}/>
            </label>
          )
        }
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