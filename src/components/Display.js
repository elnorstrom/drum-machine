import React from 'react';

const Display = (props) => (
  <div id="display" className="display">
    {props.lastPlayed}
  </div>
);

export default Display;