import React from 'react';

const Repeater = (props) => (
  <div>
    <label htmlFor="duration">Duration {props.durationAndSpeed.duration}</label>
    <input
      type="range"
      min="1000"
      max="5000"
      name="duration"
      onChange={props.repeaterDurationInput}
    />
    <label htmlFor="speed">Speed {props.durationAndSpeed.speed}</label>
    <input
      type="range"
      min="10"
      max="1000"
      name="speed"
      onChange={props.repeaterSpeedInput}/>
  </div>
);

export default Repeater;
