import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const soundBell = './sounds/bell.wav';

  const playBell = () => {
    const sound = new Audio(soundBell);
    sound.play();
  }

  
  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    )
  }

  const stopTimer = () => {
    setTimer(clearInterval(timer));
    setTime(0);
    setStatus('off');
  }

  const closeApp = ()  => {
    window.close();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if(time === 0){
      if(status === 'work') {
        setStatus('rest');
        playBell();
        setTime(20);
      } else if(status === 'rest'){
        setStatus('work');
        playBell();
        setTime(1200);
      }
    }
  }, [time]);

  return (
    <div>
      {(status === 'off') && <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">
          {formatTime(time)}
        </div>}
        {(status === 'off') && <button onClick={startTimer} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={stopTimer} className="btn">Stop</button>}
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
