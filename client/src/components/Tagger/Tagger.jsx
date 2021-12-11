import React from 'react';
import { CurrentTags } from "../CurrentTags/CurrentTags.jsx";
import { RateInput } from "../RateInput/RateInput.jsx";

const Tagger = (
  {
    currentTags,
    tagSetter,
    currentRate,
    setCurrentRate,
    userTags,
    inputId,
    user
  }) => {
  function addTag(e) {
    e.preventDefault();
    const tagInput = document.getElementById(inputId);
    let newTag = tagInput.value;
    if (user && user.first_name === 'demo') {
      newTag = newTag.replaceAll(/shit|piss|fuck|ass|cunt|wanker|motherfucker|bastard|dick|dickhead|cock|pussy|punani|twat|prick|tit|bitch/gi, '****');
    }
    const tagSet = new Set(currentTags);
    tagSet.add(newTag);
    tagSetter([...tagSet]);
    tagInput.value = '';
  }
  return(
    <div id="tagger">
      <CurrentTags currentTags={currentTags} setCurrentTags={tagSetter} />
      <form onSubmit={addTag}>
        <input
          id={inputId}
          list="current-tags"
          placeholder="write a tag for your time..."
        />
        <div id="clock-adjusters">
          <button>add tag</button>
          <RateInput currentRate={currentRate} setCurrentRate={setCurrentRate} />
        </div>
        <datalist id="current-tags">
          {userTags.size
            ? [...userTags].map((tag) =>
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={tag} key={`userTag${tag}`} />)
            : null}
        </datalist>
      </form>
    </div>
  );
};
export default Tagger;
