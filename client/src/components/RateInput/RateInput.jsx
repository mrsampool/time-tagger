import React from 'react';

export const RateInput = ({currentRate, setCurrentRate}) => {
  function handleChange(e){
    setCurrentRate(Number(e.target.value));
  }
  return (
    <label id="rate-wrap">
      $
      <input id="input-rate" type="number" placeholder={currentRate} min={0} onChange={handleChange}/>
      / hr
    </label>
  )
}