// Libraries
import React, {useState, useContext} from "react";
import * as yup from 'yup';

// Sub-Components
import Tagger from "../Tagger/Tagger.jsx";

// Utils / Context
import {clientUtils} from "../../clientUtils";
const {pad, parseDate, parseTime, editLogEntry, compileDTstring} = clientUtils;
import AppContext from "../../AppContext.jsx";

// Stylesheet
import './EditLog.css';
import Warn from "../Warn/Warn.jsx";

const getLogSchema = (intime, outtime) => {
  console.log(intime, outtime);
  return outtime ? yup.object().shape({
    intime: yup.date()
      .required('Start date & time are required')
      .max(outtime, 'Start-time must be before end-time'),
    outtime: yup.date()
      .min(intime, 'End-time must be after start-time'),
    rate: yup.number()
      .required('Rate is required')
      .min(0, `Rate can't be less than zero.`)
  }) : yup.object().shape({
    intime: yup.date()
      .required('Start date & time are required')
      .max(new Date(), `Start-time can't be in the future`),
    rate: yup.number()
      .required('Rate is required')
      .min(0, `Rate can't be less than zero.`)
  });
}

const EditLog = ({ logEntry, userTags, user, setEntry, setCurrentClock }) =>{
  const { log, setLog, setEditLogEntry } = useContext(AppContext);
  const { tags, rate, indate, outdate, intime, outtime, intimeobj, outtimeobj } = logEntry;
  const [newTags, setNewTags] = useState(tags);
  const [newRate, setNewRate] = useState(rate / 100);
  const [warnMessage, setWarnMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
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
      rate: newRate * 100,
    };
    console.log(submission);
    getLogSchema(new Date(submission.intime), submission.outtime ? new Date(submission.outtime) : null)
      .validate(submission)
      .then((validated) => {
        editLogEntry(user.id, logEntry.id, validated, log, setLog, setEditLogEntry, setCurrentClock);
      })
      .catch((err) => setWarnMessage(err.message));
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
          <input
            id="input-indate"
            type="date"
            defaultValue={parseDate(indate)}
          />
          <input
            id="input-intime"
            type="time"
            defaultValue={parseTime(new Date(intimeobj).toLocaleTimeString())}
          />
        </label>
        {
          outtime && (
            <label>
              End
              <input
                id="input-outdate"
                type="date"
                defaultValue={parseDate(outdate)}
              />
              <input
                id="input-outtime"
                type="time"
                defaultValue={parseTime(new Date(outtimeobj).toLocaleTimeString('en-US'))}
              />
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
        <Warn message={warnMessage} setMessage={setWarnMessage} />
        <button type="button" onClick={handleSubmit}>Save Changes</button>
        <button type="button" className="red" onClick={close}>Cancel</button>
      </div>
    </div>
  );
};
export default EditLog;