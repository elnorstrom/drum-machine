import React from 'react';

const DrumPad = (props) => (
  <div>
    <audio src={props.drumSound.sound}></audio>
    <button onClick={props.drumSound.soundLog}>{props.drumSound.name}</button>
  </div>
);

export default DrumPad;