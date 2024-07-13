import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const App = () => {

  const [status, setStatus] = useState('work');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if(status === 'off') {
      setViewDescription(true); 
      setViewWork(false);
      setViewRest(false);
    } else if (status === 'work') {
      setViewDescription(false);
      setViewWork(true);
    } else if (status === 'rest') {
      setViewDescription(false);
      setViewWork(false);
      setViewRest(true);
    }
  }, [status]);

  const formatTime = useMemo((time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
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
        {(status === 'off') && <button className="btn">Start</button>}
        {(status !== 'off') && <button className="btn">Stop</button>}
      <button className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
