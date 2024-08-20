// src/App.jsx
import React from 'react';
import ReviewList from './components/ReviewList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Review Highlighter</h1>
      <ReviewList />
    </div>
  );
}

export default App;
