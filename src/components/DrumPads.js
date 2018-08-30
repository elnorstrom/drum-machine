import React from 'react';
import DrumPad from './DrumPad';

const DrumPads = (props) => (
  <div>
    <DrumPad drumSound={props.drumSounds.snare}/>
    <DrumPad drumSound={props.drumSounds.kick}/>
  </div>
);

export default DrumPads;