//React
import React from "react";

//Stylesheet
import "./Clock.css";
import { CurrentTags } from "../CurrentTags/CurrentTags.jsx";

export const Clock = (props) => {
  const {
    clockedIn,
    currentClock,
    currentTags,
    setCurrentClock,
    setCurrentTags,
    toggleClock,
    userTags,
    currentDlrs,
  } = props;
  const { intime, rate, tags } = currentClock;

  function addTag(e) {
    e.preventDefault();
    let tagInput = document.getElementById("add-tag");
    let tags = new Set(currentTags);
    tags.add(tagInput.value);
    setCurrentTags([...tags]);
    tagInput.value = "";
  }

  return (
    <div id="Clock">
      <h1 id="logo">TimeTagger</h1>
      <CurrentTags currentTags={currentTags} setCurrentTags={setCurrentTags} />
      <form onSubmit={addTag}>
        <input
          id="add-tag"
          list="current-tags"
          placeholder="write a tag for your time..."
        />
        <div id="clock-adjusters">
          <button>add tag</button>
          <label id="rate-wrap">
            $
            <input type="number" placeholder={50} min={0} />
            / hr
          </label>
        </div>
        <datalist id="current-tags">
          {userTags.size
            ? [...userTags].map((tag) => {
                return <option value={tag} key={`userTag${tag}`} />;
              })
            : null}
        </datalist>
      </form>
      <button onClick={toggleClock} id={clockedIn ? "clock-out" : "clock-in"}>
        {clockedIn ? "CLOCK OUT" : "CLOCK IN"}
      </button>
      <div className={`clocked-since ${clockedIn ? "in" : "out"}`}>
        <p className="clocked-time-label">clocked in since:</p>
        <div>
          <span id="clocked-time">{intime || "-"}</span>
          <span id="clocked-dlrs">{currentDlrs || "-"}</span>
        </div>
      </div>
    </div>
  );
};
