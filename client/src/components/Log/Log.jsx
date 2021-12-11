//React
import React, { useEffect, useState } from "react";

// Sub-Components
import { LogEntry } from "../LogEntry/LogEntry.jsx";
import { LogSum } from "../LogSum/LogSum";

//Stylesheet
import "./Log.css";

export const Log = (props) => {
  let { log, currentTags, editEntry } = props;
  let [filteredLog, setFilteredLog] = useState(log);

  useEffect(() => {
    if (currentTags.length > 0) {
      setFilteredLog(
        log.filter((logEntry) => {
          return currentTags.every((tag) => {
            return logEntry.tags.includes(tag);
          });
        })
      );
    } else {
      setFilteredLog(log);
    }
  }, [log, currentTags]);

  return (
    <div id="Log">
      <LogSum log={filteredLog} />
      {filteredLog.map((entry) => {
        return <LogEntry entry={entry} key={`log-entry-${entry.id}`} editEntry={editEntry} />;
      })}
    </div>
  );
};
