import React from 'react';
import Header from './Header';
import DrumPads from './DrumPads';

export default class DrumMachineApp extends React.Component {
  constructor() {
    super();
    this.snareSound = this.snareSound.bind(this);
    this.kickSound = this.kickSound.bind(this);
    this.state = {
      snare: {
        name: 'Snare',
        sound: this.snareSound
      },
      kick: {
        name: 'Kick',
        sound: this.kickSound
      }
    }
  }
  snareSound() {
    console.log('Snare sound!');
  }
  kickSound() {
    console.log('Kick sound!');
  }
  render() {
    return (
      <div>
        <Header />
        <DrumPads drumSounds={this.state}/>
      </div>
    );
  };
};