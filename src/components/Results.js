import React, { useEffect, useState } from 'react';

const Results = ({ wpm, accuracy, correct, incorrect, onRestart }) => {
  const [displayWpm, setDisplayWpm] = useState(0);
  const [displayAcc, setDisplayAcc] = useState(0);

  useEffect(() => {
    let wpmFrame, accFrame;
    let start = null;
    function animateWpm(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 800, 1);
      setDisplayWpm(Math.round(progress * wpm));
      if (progress < 1) wpmFrame = requestAnimationFrame(animateWpm);
      else setDisplayWpm(wpm);
    }
    function animateAcc(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1000, 1);
      setDisplayAcc(Math.round(progress * accuracy));
      if (progress < 1) accFrame = requestAnimationFrame(animateAcc);
      else setDisplayAcc(accuracy);
    }
    wpmFrame = requestAnimationFrame(animateWpm);
    accFrame = requestAnimationFrame(animateAcc);
    return () => {
      cancelAnimationFrame(wpmFrame);
      cancelAnimationFrame(accFrame);
    };
  }, [wpm, accuracy]);

  // Confetti burst
  useEffect(() => {
    import('canvas-confetti').then(confetti => {
      confetti.default({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999
      });
    });
  }, []);

  return (
    <div className="results">
      <h2>Results</h2>
      <p style={{ fontSize: '2.2rem', fontWeight: 700, margin: '12px 0' }}>WPM: <span>{displayWpm}</span></p>
      <p style={{ fontSize: '2.2rem', fontWeight: 700, margin: '12px 0' }}>Accuracy: <span>{displayAcc}%</span></p>
      <p>Correct Words: {correct}</p>
      <p>Incorrect Words: {incorrect}</p>
      <button onClick={onRestart}>Try Again</button>
    </div>
  );
};

export default Results; 