import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TypingTest from './components/TypingTest';
import Navbar from './components/Navbar';

const Results = lazy(() => import('./components/Results'));
const Chart = lazy(() => import('./components/Chart'));
const Auth = lazy(() => import('./components/Auth'));

function App() {
  const [user, setUser] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleTestComplete = (result) => {
    setTestResult(result);
    if (user) {
      const newHistory = [...history, { ...result, date: new Date().toLocaleString() }];
      setHistory(newHistory);
      // Optionally, save to backend or Firebase here
    }
  };

  const handleRestart = () => {
    setTestResult(null);
  };

  return (
    <Router>
      <Navbar user={user} />
      <div className="container">
        <Routes>
          <Route path="/" element={
            !testResult ? (
              <TypingTest onComplete={handleTestComplete} />
            ) : (
              <Suspense fallback={<div>Loading results...</div>}>
                <Results {...testResult} onRestart={handleRestart} />
              </Suspense>
            )
          } />
          <Route path="/history" element={
            <Suspense fallback={<div>Loading chart...</div>}>
              <Chart data={history} />
            </Suspense>
          } />
          <Route path="/auth" element={
            <Suspense fallback={<div>Loading auth...</div>}>
              <Auth user={user} setUser={setUser} />
            </Suspense>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
