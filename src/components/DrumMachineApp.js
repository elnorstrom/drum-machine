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
    this.fadeOut = this.fadeOut.bind(this);
    this.state = {
      lastPlayed: <p>&nbsp;</p>,
      fadeOutIsOn: false,
      repeater: {
        duration: 0,
        durationFormatted: '0',
        speed: 0,
        speedFormatted: '0',
        inputSpeed: 0
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
        sound: '../sounds/CyCdh_K3Crash-05.wav'
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

  repeater(time, speed, sound, vol = 1, initialTime = time) {
    if (time > initialTime) {
      return;
    }
    let theTime = time === initialTime ? 0 : time;
    setTimeout(() =>  {
      sound.currentTime = 0;
      sound.volume = vol <= 0 ? 0 : vol;
      sound.play()
    }, theTime);
    let nextVol;
    if (this.state.fadeOutIsOn) {
      let newVol = vol * 100;
      let subtractVolumeBy = initialTime / speed;
      newVol -= subtractVolumeBy;
      nextVol = Number((newVol / 100).toFixed(2));
    }
    this.repeater(theTime + speed, speed, sound, nextVol, initialTime);
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
    let repeaterIsOn = this.state.repeater.duration ?
        this.state.repeater.speed ? true : false
      : 
        false;
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
    console.log(duration);
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
    let inputSpeed = Number(e.target.value);
    let speedFormatted = inputSpeed ? [...e.target.value].slice(0, -1) : '0';
    console.log(speedFormatted);
    let reverseNumber = Math.abs(inputSpeed - 1000);
    let speed = reverseNumber > 0 ? reverseNumber : 1;
    console.log(reverseNumber);
    this.setState((prevState) => ({
      repeater: {
        duration: prevState.repeater.duration,
        durationFormatted: prevState.repeater.durationFormatted,
        speed: speed,
        speedFormatted: speedFormatted,
        inputSpeed: inputSpeed
      }
    }));
  };

  fadeOut() {
    console.log(this.state.fadeOutIsOn);
    this.setState((prevState) => ({
      fadeOutIsOn: !prevState.fadeOutIsOn
    }));
  };

  render() {
    return (
      <div id="drum-machine">
        <Header />
        <div className="main-app">
          <div className="drum-machine">
            <Display
              lastPlayed={this.state.lastPlayed}
            />
            <DrumPads
              drumSounds={this.state}
              playSound={this.playSound}
            />
          </div>
          <Reapeater
            repeaterDurationInput={this.repeaterDurationInput}
            repeaterSpeedInput={this.repeaterSpeedInput}
            durationAndSpeed={this.state.repeater}
            fadeOut={this.fadeOut}
            fadeOutIsOn={this.state.fadeOutIsOn}
          />
        </div>
      </div>
    );
  };
};

