import React from 'react';

const DrumPad = (props) => (
  <div
    className="drum-pad"
    id={props.drumSound.keyboardKey} 
    onClick={() => props.playSound(props.drumSound.keyCode, props.drumSound.keyboardKey)}
  >
    {props.drumSound.keyboardKey}
    <audio
      ref={(audio) => { props.drumSound.ref = audio }}
      id={props.drumSound.keyboardKey}
      src={props.drumSound.sound}
      volume={1}
      className="clip"
    >
    </audio>
  </div>
);

export default DrumPad;