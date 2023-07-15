import { useEffect, useState } from 'react';

export const CountDown = () => {
  const [count, setCount] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [count]);
  return (
    <div>
      <div className="flex flex-row">
        <div className="countdown-el days-c">
          <p className="big-text" id="days">
            Dager
          </p>
          <span>4</span>
        </div>
        <div className="countdown-el hours-c">
          <p className="big-text" id="hours">
            Timer
          </p>
          <span>12</span>
        </div>
        <div className="countdown-el mins-c">
          <p className="big-text" id="mins">
            Minutter
          </p>
          <span>56</span>
        </div>
        <div className="countdown-el seconds-c">
          <p className="big-text" id="seconds">
            Sekunder
          </p>
          <span>35</span>
        </div>
      </div>
    </div>
  );
};
