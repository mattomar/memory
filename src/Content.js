import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchGiphyData } from "./fetchGiphyData";
import './styles/Card.css'; 

const names = [
  'Ted Mosby',
  'Barney Stinson',
  'Robin Scherbatsky',
  'Lily Aldrin',
  'Marshall Eriksen',
  'Cristin Milioti',
  'David Henrie'
];

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Content({ updateScore, resetScore }) {
  const [gifs, setGifs] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [hasWon, setHasWon] = useState(false); // Track if the player has won

  useEffect(() => {
    const storedGifs = localStorage.getItem("giphyGifs");

    if (storedGifs) {
      setGifs(JSON.parse(storedGifs));
    } else {
      const getGifs = async () => {
        const gifPromises = names.map(name => fetchGiphyData(name));
        const gifResults = await Promise.all(gifPromises);
        const flattenedGifs = gifResults.flat();
        setGifs(flattenedGifs);
        localStorage.setItem("giphyGifs", JSON.stringify(flattenedGifs));
      };
  
      getGifs();
    }
  }, []);

  const handleCardClick = (gif) => {
    if (clickedCards.includes(gif.id)) {
      resetScore(); // Reset score if the card was already clicked
      setClickedCards([]); // Restart game
    } else {
      updateScore(); // Increment score
      const updatedClickedCards = [...clickedCards, gif.id];
      setClickedCards(updatedClickedCards); // Add card to clicked list
      
      // Check if all cards are clicked
      if (updatedClickedCards.length === gifs.length) {
        setHasWon(true); // Set win state
      }
    }

    setGifs(shuffleArray(gifs)); // Shuffle the cards
  };

  return (
    <div>
      {hasWon && <div className="win-message">You Win!</div>} {/* Show win message when all cards are clicked */}
      <div className="cards">
        {gifs.map((gif) => (
          <Card
            key={gif.id}
            imageSrc={gif.images.fixed_height.url}
            name={gif.title}
            onClick={() => handleCardClick(gif)}
          />
        ))}
      </div>
    </div>
  );
}

export default Content;