import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Function to reset the score to 0
  const resetScore = () => {
    setCurrentScore(0);
  };

  // Function to increment the score
  const updateScore = () => {
    setCurrentScore((prevScore) => prevScore + 1);  // Increment score
    // Update best score if the current score is higher
    setBestScore((prevBestScore) => 
      currentScore + 1 > prevBestScore ? currentScore + 1 : prevBestScore
    );
  };

  return (
    <div className="app">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Content updateScore={updateScore} resetScore={resetScore} />
    </div>
  );
}

export default App;

