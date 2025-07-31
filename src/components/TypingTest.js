import React, { useState, useEffect, useRef } from 'react';
import generateWords from '../utils/wordGenerator';

const TEST_DURATION = 60; // seconds

const TypingTest = ({ onComplete }) => {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(TEST_DURATION);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [typedWords, setTypedWords] = useState([]); // for feedback
  const inputRef = useRef(null);

  useEffect(() => {
    setWords(generateWords(50));
  }, []);

  useEffect(() => {
    if (started && timer > 0 && !finished) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !finished) {
      finishTest();
    }
  }, [started, timer, finished]);

  const handleInput = (e) => {
    if (!started) setStarted(true);
    setInput(e.target.value);
    if (e.target.value.endsWith(' ')) {
      checkWord(e.target.value.trim());
      setInput('');
    }
  };

  const checkWord = (typedWord) => {
    const currentWord = words[correct + incorrect];
    if (typedWord === currentWord) {
      setCorrect(c => c + 1);
      setTypedWords(tw => [...tw, 'correct']);
    } else {
      setIncorrect(i => i + 1);
      setTypedWords(tw => [...tw, 'incorrect']);
    }
  };

  const finishTest = () => {
    setFinished(true);
    onComplete({
      wpm: Math.round((correct / TEST_DURATION) * 60),
      accuracy: correct + incorrect === 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100),
      correct,
      incorrect,
    });
  };

  return (
    <div className="typing-test">
      <div className="animated-bg" />
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(timer / TEST_DURATION) * 100}%` }}
        />
      </div>
      <h2>Typing Test</h2>
      <div className="words">
        {words.map((word, idx) => {
          let className = 'word';
          if (typedWords[idx] === 'correct') className += ' correct';
          else if (typedWords[idx] === 'incorrect') className += ' incorrect';
          else if (idx === correct + incorrect) className += ' current';
          return (
            <span key={idx} className={className}>{word} </span>
          );
        })}
      </div>
      <input
        ref={inputRef}
        value={input}
        onChange={handleInput}
        disabled={finished || timer === 0}
        placeholder="Start typing..."
        autoFocus
      />
      <div className="info">
        <span>Time: {timer}s</span>
        <span>WPM: {Math.round((correct / (TEST_DURATION - timer || 1)) * 60)}</span>
        <span>Accuracy: {correct + incorrect === 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100)}%</span>
      </div>
      {finished && <button onClick={() => window.location.reload()}>Restart</button>}
    </div>
  );
};

export default TypingTest; 