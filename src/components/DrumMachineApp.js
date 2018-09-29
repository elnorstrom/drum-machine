import React from 'react';
import Header from './Header';
import Display from './Display';
import DrumPads from './DrumPads';
import Reapeater from './Repeater';
import AudioInput from './AudioInput';

export default class DrumMachineApp extends React.Component {
  constructor() {
    super();
    this.repeater = this.repeater.bind(this);
    this.playSound = this.playSound.bind(this);
    this.repeaterDurationInput = this.repeaterDurationInput.bind(this);
    this.repeaterSpeedInput = this.repeaterSpeedInput.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.state = {
      lastPlayed: <p>&nbsp;</p>,
      repeater: {
        duration: 0,
        durationFormatted: '0',
        speed: 0,
        speedFormatted: '0'
      },
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

  repeater(time, speed, sound) {
    if (time <= 0 ) {
      return;
    }
    setTimeout(() =>  {
      sound.currentTime = 0;
      sound.play()
    }, time);
    this.repeater(time - speed, speed, sound);
  };

  playSound(e, name) {
    let key = e.keyCode === undefined ? e : e.keyCode;
    if (!this.state.keyboardMap[key]) {
      return;
    };
    let currentId = name ? name : e.key.toUpperCase();
    let currentSound = this.state.keyboardMap[key].ref;
    let currentName = this.state.keyboardMap[key].displayName;
    let regularClass = "drum-pad";
    let activeClass = " drum-pad__active";
    currentSound.currentTime = 0;
    currentSound.play();
    let repeaterIsOn = this.state.repeater.duration ? this.state.repeater.speed ? true : false : false;
    if (repeaterIsOn) {
      let speed = this.state.repeater.speed;
      let duration = this.state.repeater.duration;
      this.repeater(duration, speed, currentSound);
    };
    this.setState(() => ({ lastPlayed: <p>{currentName}</p> }));
    document.getElementById(currentId).className += activeClass;
    this.removeClass(currentId, regularClass);
  };

  removeClass(id, whatClass) {
    setTimeout(() => {
      document.getElementById(id).className += whatClass;
    }, 50);
  };

  repeaterDurationInput(e) {
    let duration = Number(e.target.value);
    let durationAsString = e.target.value;
    let durationFormatted = `${[...durationAsString].shift()}.${durationAsString.slice(1, -1)}`;
    this.setState((prevState) => ({
      repeater: {
        duration: duration,
        durationFormatted: durationFormatted,
        speed: prevState.repeater.speed,
        speedFormatted: prevState.repeater.speedFormatted
      }
    }));
  };

  repeaterSpeedInput(e) {
    let speed = Number(e.target.value);
    let speedFormatted = speed ? [...e.target.value].slice(0, -1) : '0';
    console.log(speed)
    console.log(speedFormatted);
    this.setState((prevState) => ({
      repeater: {
        duration: prevState.repeater.duration,
        durationFormatted: prevState.repeater.durationFormatted,
        speed: speed,
        speedFormatted: speedFormatted
      }
    }));
  };

  componentDidUpdate() {
    console.log(this.state.repeater)
  };

  render() {
    return (
      <div id="drum-machine">
        <Header />
        <div className="main-app">
          <Display
            lastPlayed={this.state.lastPlayed}
          />
          <DrumPads
            drumSounds={this.state}
            playSound={this.playSound}
          />
          <Reapeater
            repeaterDurationInput={this.repeaterDurationInput}
            repeaterSpeedInput={this.repeaterSpeedInput}
            durationAndSpeed={this.state.repeater}
          />
        </div>
      </div>
    );
  };
};

