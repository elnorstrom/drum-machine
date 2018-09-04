import React from 'react';
import DrumPad from './DrumPad';

const DrumPads = (props) => (
  <div>
    <DrumPad drumSound={props.drumSounds.snare} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.kick} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.ride} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.crash} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.hiHat} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.hiHatOpen} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.tom1} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.tom2} playSound={props.playSound}/>
    <DrumPad drumSound={props.drumSounds.tom3} playSound={props.playSound}/>
  </div>
);

export default DrumPads;