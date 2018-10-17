import React from 'react';

const Repeater = (props) => (
  <div className="sliders">
    <label
      className="slider-labels"
      htmlFor="duration">{`Duration ${props.durationAndSpeed.durationFormatted}s`}</label>
    <input
      className="slider"
      type="range"
      value={props.durationAndSpeed.duration}
      min="1000"
      max="5000"
      name="duration"
      onChange={props.repeaterDurationInput}
    />
    <label
      className="slider-labels"
      htmlFor="speed">Speed {props.durationAndSpeed.speedFormatted}</label>
    <input
      className="slider slider-speed"
      type="range"
      value={props.durationAndSpeed.inputSpeed}
      min="0"
      max="1000"
      name="speed"
      onChange={props.repeaterSpeedInput}/>
      <div>
        <div className="fade-button-container">
          <button
            className={`fade-button ${props.fadeOutIsOn ? "fade-button-on" : "fade-button-off"}`}
            onClick={props.fadeOut}
          >{props.fadeOutIsOn ? "Fade Out Is On" : "Fade Out Is Off"}
          </button>
        </div>
      </div>
  </div>
);

export default Repeater;
