// React
import React from 'react';

// Stylesheet
import './LogEntryTags.css';

const LogEntryTags = ({ tags }) => (
  <div className="tags">
    {tags.length
      ? tags.map((tag, index) => {
        return (
          <span className="tag" key={`logentrytag${tag}${index}`}>
                  {tag}
                </span>
        );
      })
      : null}
  </div>
);
export default LogEntryTags;
