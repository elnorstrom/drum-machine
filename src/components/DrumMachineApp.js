import React from 'react';
import Header from './Header';
import Display from './Display';
import DrumPads from './DrumPads';
import AudioInput from './AudioInput';

export default class DrumMachineApp extends React.Component {
  constructor() {
    super();
    this.playsound = this.playSound.bind(this);
    this.keyBoardEvent = this.keyBoardEvent.bind(this);
    this.state = {
      lastPlayed: '',
      snare: {
        name: 'snare',
        keyboardKey: 'X',
        sound: "../../sounds/CyCdh_K3Snr-09.wav"
      },
      kick: {
        name: 'kick',
        keyboardKey: 'Z',
        sound: "../../sounds/CyCdh_K3Kick-03.wav"
      },
      ride: {
        name: 'ride',
        keyboardKey: 'W',
        sound: '../../sounds/CyCdh_K3Crash-05.wav'
      },
      crash: {
        name: 'crash',
        keyboardKey: 'Q',
        sound: '../../sounds/CyCdh_K3Crash-07.wav'
      },
      hiHat: {
        name: 'hiHat',
        keyboardKey: 'E',
        sound: '../../sounds/CyCdh_K3ClHat-04.wav'
      },
      hiHatOpen: {
        name: 'hiHatOpen',
        keyboardKey: 'A',
        sound: '../../sounds/CyCdh_K3OpHat-03.wav'
      },
      tom1: {
        name: 'tom1',
        keyboardKey: 'D',
        sound: '../../sounds/CyCdh_K3Tom-01.wav'
      },
      tom2: {
        name: 'tom2',
        keyboardKey: 'S',
        sound: '../../sounds/CyCdh_K3Tom-04.wav'
      },
      tom3: {
        name: 'tom3',
        keyboardKey: 'C',
        sound: '../../sounds/CyCdh_K3Tom-05.wav'
      }
    };
  };
  
  componentDidMount() {
    this.setState(() => ({
      keyboardMap: {
        90: [this.state.kick.ref, 'Kick'],
        88: [this.state.snare.ref, 'Snare'],
        67: [this.state.tom3.ref, 'Floor Tom'],
        68: [this.state.tom1.ref, 'Rack Tom 1'],
        83: [this.state.tom2.ref, 'Rack Tom 2'],
        65: [this.state.hiHatOpen.ref, 'Open Hi-Hat'],
        69: [this.state.hiHat.ref, 'Hi-Hat'],
        87: [this.state.ride.ref, 'Ride'],
        81: [this.state.crash.ref, 'Crash']
      }
    })
  );
    document.addEventListener('keydown', this.keyBoardEvent);
  };

  keyBoardEvent(e) {
    let key = e.keyCode
    if (!this.state.keyboardMap[key]) return;
    this.state.keyboardMap[key][0].currentTime = 0;
    this.state.keyboardMap[key][0].play();
    console.log(this.state.keyboardMap[key][1]);
    this.setState(() => ({ lastPlayed: this.state.keyboardMap[key][1] }));
  };

  playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  };

  render() {
    return (
      <div id="drum-machine">
        <Header />
        <Display lastPlayed={this.state.lastPlayed}/>
        <DrumPads drumSounds={this.state} playSound={this.playSound}/>
        <AudioInput />
      </div>
    );
  };
};
