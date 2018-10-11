import React from 'react';

const Repeater = (props) => (
  <div className="sliders">
    <label htmlFor="duration">{`Duration ${props.durationAndSpeed.durationFormatted}s`}</label>
    <input
      className="slider"
      type="range"
      value={props.durationAndSpeed.duration}
      min="1000"
      max="5000"
      name="duration"
      onChange={props.repeaterDurationInput}
    />
    <label htmlFor="speed">Speed {props.durationAndSpeed.speedFormatted}</label>
    <input
      className="slider"
      type="range"
      value={props.durationAndSpeed.speed}
      min="0"
      max="1000"
      name="speed"
      onChange={props.repeaterSpeedInput}/>
      <div>
        <button onClick={props.fadeOut}>{props.fadeOutIsOn ? "Fade Out Is On" : "Fade Out Is Off"}</button>
      </div>
  </div>
);

export default Repeater;
