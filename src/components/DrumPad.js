import React from 'react';

const DrumPad = (props) => (
  <div>
    <button onClick={props.drumSound.sound}>{props.drumSound.name}</button>
  </div>
);

export default DrumPad;