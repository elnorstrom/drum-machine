import React from 'react';
import Header from './Header';
import Display from './Display';
import DrumPads from './DrumPads';
import AudioInput from './AudioInput';

export default class DrumMachineApp extends React.Component {
  constructor() {
    super();
    this.playSound = this.playSound.bind(this);
    this.state = {
      lastPlayed: '',
      snare: {
        name: 'snare',
        keyboardKey: 'X',
        keyCode: 88,
        sound: "../../sounds/CyCdh_K3Snr-09.wav"
      },
      kick: {
        name: 'kick',
        keyboardKey: 'Z',
        keyCode: 90,
        sound: "../../sounds/CyCdh_K3Kick-03.wav"
      },
      ride: {
        name: 'ride',
        keyboardKey: 'W',
        keyCode: 87,
        sound: '../../sounds/CyCdh_K3Crash-05.wav'
      },
      crash: {
        name: 'crash',
        keyboardKey: 'Q',
        keyCode: 81,
        sound: '../../sounds/CyCdh_K3Crash-07.wav'
      },
      hiHat: {
        name: 'hiHat',
        keyboardKey: 'E',
        keyCode: 69,
        sound: '../../sounds/CyCdh_K3ClHat-04.wav'
      },
      hiHatOpen: {
        name: 'hiHatOpen',
        keyboardKey: 'A',
        keyCode: 65,
        sound: '../../sounds/CyCdh_K3OpHat-03.wav'
      },
      tom1: {
        name: 'tom1',
        keyboardKey: 'D',
        keyCode: 68,
        sound: '../../sounds/CyCdh_K3Tom-01.wav'
      },
      tom2: {
        name: 'tom2',
        keyboardKey: 'S',
        keyCode: 83,
        sound: '../../sounds/CyCdh_K3Tom-04.wav'
      },
      tom3: {
        name: 'tom3',
        keyboardKey: 'C',
        keyCode: 67,
        sound: '../../sounds/CyCdh_K3Tom-05.wav'
      },
    };
  };

  componentDidMount() {
    this.setState(() => ({
      keyboardMap: {
        90: { ref: this.state.kick.ref, displayName: 'Kick'},
        88: { ref: this.state.snare.ref, displayName: 'Snare'},
        67: { ref: this.state.tom3.ref, displayName: 'Floor Tom'},
        68: { ref: this.state.tom1.ref, displayName: 'Rack Tom 1'},
        83: { ref: this.state.tom2.ref, displayName: 'Rack Tom 2'},
        65: { ref: this.state.hiHatOpen.ref, displayName: 'Open Hi-Hat'},
        69: { ref: this.state.hiHat.ref, displayName: 'Hi-Hat'},
        87: { ref: this.state.ride.ref, displayName: 'Ride'},
        81: { ref: this.state.crash.ref, displayName: 'Crash'}
      }
    })
  );
    document.addEventListener('keydown', this.playSound);
  };

  playSound(e) {
    let key = e.keyCode === undefined ? e : e.keyCode;
    if (!this.state.keyboardMap[key]) return;
    let currentSound = this.state.keyboardMap[key].ref;
    let currentName = this.state.keyboardMap[key].displayName;
    currentSound.currentTime = 0;
    currentSound.play();
    this.setState(() => ({ lastPlayed: currentName }));
  };

  render() {
    return (
      <div id="drum-machine">
        <Header />
        <Display id="display" lastPlayed={this.state.lastPlayed}/>
        <DrumPads drumSounds={this.state} playSound={this.playSound}/>
        <AudioInput />
      </div>
    );
  };
};
