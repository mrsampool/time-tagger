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
  console.log(new Date(entry.intimeobj));
  return (
    <div className={`log-entry ${!entry.outtime ? "current" : ""}`}>
      <div className="datetime-info">
        <LogEntryDates indate={entry.indate} outdate={entry.outdate} />
        <LogEntryTimes intime={entry.intime} outtime={entry.outtime} />
        <LogEntryNums entry={entry} />
        <LogEntryValue value={entry.value} />
        {/*
          <div>
            <button onClick={() => { editEntry(entry); }}>EDIT</button>
          </div>
        */}
      </div>
      <LogEntryTags tags={entry.tags} />
    </div>
  );
};
