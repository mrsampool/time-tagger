import React from 'react';

export const RateInput = ({currentRate, setCurrentRate}) => {
  function handleChange(e){
    console.log(e.target.value);
    setCurrentRate(Number(e.target.value));
  }
  return (
    <label id="rate-wrap">
      $
      <input type="number" placeholder={currentRate} min={0} onChange={handleChange}/>
      / hr
    </label>
  )
}