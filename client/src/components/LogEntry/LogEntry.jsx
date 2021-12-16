//React
import React from "react";

//Stylesheet
import "./LogEntry.css";
import LogEntryDates from "../LogEntryDates/LogEntryDates.jsx";
import LogEntryTimes from "../LogEntryTimes/LogEntryTimes.jsx";
import LogEntryNums from "../LogEntryNums/LogEntryNums.jsx";
import LogEntryValue from "../LogEntryValue/LogEntryValue.jsx";
import LogEntryTags from "../LogEntryTags/LogEntryTags.jsx";

export const LogEntry = (props) => {
  const { entry, editEntry } = props;
  return (
    <div className={`log-entry ${!entry.outtime ? "current" : ""}`}>
      <div className="datetime-info">
        <LogEntryDates indate={entry.indate} outdate={entry.outdate} />
        <LogEntryTimes intimeObj={entry.intimeobj} outtimeObj={entry.outtimeobj} />
        <LogEntryNums entry={entry} />
        <LogEntryValue value={entry.value} />
        <button onClick={() => { editEntry(entry); }}>EDIT</button>
      </div>
      <LogEntryTags tags={entry.tags} />
    </div>
  );
};
