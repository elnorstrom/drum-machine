import React from 'react';
import Header from './Header';
import DrumPads from './DrumPads';
import AudioInput from './AudioInput';

export default class DrumMachineApp extends React.Component {
  constructor() {
    super();
    this.snareSound = this.snareSound.bind(this);
    this.kickSound = this.kickSound.bind(this);
    this.state = {
      snare: {
        name: 'Snare',
        sound: "../../sounds/CyCdh_K3Snr-09.wav",
        soundLog: this.snareSound
      },
      kick: {
        name: 'Kick',
        sound: "../../sounds/CyCdh_K3Kick-03.wav",
        soundLog: this.kickSound
      }
    };
  };

  snareSound() {
    console.log('Snare sound!');
  };
  kickSound() {
    console.log('Kick sound!');
  };
  
  render() {
    return (
      <div>
        <Header />
        <DrumPads drumSounds={this.state}/>
        <AudioInput />
        <audio ref={(snare) => {this.snare = snare}} src={this.state.snare.sound}></audio>
        <audio ref={(kick) => {this.kick = kick}} src={this.state.kick.sound}></audio>
        <button onClick={() => this.snare.play()}>snare!!!</button>
        <button onClick={() => this.kick.play()}>kick!!!</button>
      </div>
    );
  };
};

