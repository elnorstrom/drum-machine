import React from 'react';

const DrumPad = (props) => (
  <div>
    <audio
      ref={(audio) => { props.drumSound.ref = audio }}
      id={props.drumSound.name}
      src={props.drumSound.sound}
      className="clip"
      >
    </audio>
    <button
      onClick={() => props.playSound(props.drumSound.ref)}
      >
      {props.drumSound.keyboardKey} ({props.drumSound.name})
    </button>
  </div>
);

export default DrumPad;