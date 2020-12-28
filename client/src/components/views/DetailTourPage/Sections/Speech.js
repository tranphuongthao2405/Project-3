/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Button } from 'antd';

function Speech(props) {
  const playAudio = () => {
    const audioEl = document.getElementsByClassName('audio-element')[0];
    audioEl.play();
  };

  return (
    <div>
      <Button onClick={playAudio}>
        <span>Play Audio</span>
      </Button>
      <audio className="audio-element">
        <source src={`http://localhost:5000/${props.soundFile}`} />
      </audio>
    </div>
  );
}

export default Speech;
