import React, { useState } from "react";
import { Button } from "antd";

function Speech(props) {
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  return (
    <div>
      <Button onClick={playAudio}>
        <span>Play Audio</span>
      </Button>
      <audio className="audio-element">
        <source src={`http://localhost:5000/${props.soundFile}`}></source>
      </audio>
    </div>
  );
}

export default Speech;
