//React
import React from "react";

//Stylesheet
import "./LogEntry.css";

export const LogEntry = (props) => {
  const { entry, editEntry } = props;
  return (
    <div className={`log-entry ${!entry.outtime ? "current" : ""}`}>
      <div className="datetime-info">
        <div className="data-field dates">
          <span>{entry.indate}</span>
          {entry.outdate !== entry.indate ? <span>{entry.outdate}</span> : null}
        </div>
        <div className="data-field times">
          <span>{entry.intime}</span>
          <span className="out-time">{entry.outtime || "CURRENT"}</span>
        </div>
        <div className="data-field numbers">
          {
            entry && entry.outtime && entry.totaltime && entry.totaltime.length &&
            <span>{
              entry.totaltime
                .split(' ')
                .filter((section) => {
                  return section.indexOf('00h') === -1 && section.indexOf('00m') === -1;
                })
                .join(' ')
            }</span>
          }
          <span>${entry.rate / 100}/hr</span>
        </div>
        {entry.value !== null ? (
          <div className="data-field value">
            <span>{entry.value !== null ? `$${entry.value / 100}` : ""}</span>
          </div>
        ) : null}
        <div>
          <button onClick={() => { editEntry(entry); }}>EDIT</button>
        </div>
      </div>
      <div className="tags">
        {entry.tags.length
          ? entry.tags.map((tag, index) => {
            return (
                <span className="tag" key={`logentrytag${tag}${index}`}>
                  {tag}
                </span>
            );
          })
          : null}
      </div>
    </div>
  );
};
