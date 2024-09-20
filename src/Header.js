import React from "react";
import './styles/Header.css';

function Header({ currentScore, bestScore }) {
  return (
    <div className="header">
      <div className="left-side">
        <p>Memory Card Game</p>
      </div>
      <div className="right-side">
        <div className="current-score">
          <p>Current Score: {currentScore}</p>
        </div>
        <div className="best-score">
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;