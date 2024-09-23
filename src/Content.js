import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchGiphyData } from "./fetchGiphyData";
import './styles/Card.css'; 

const defaultNames = [
  'Ted Mosby',
  'Barney Stinson',
  'Robin Scherbatsky',
  'Lily Aldrin',
  'Marshall Eriksen',
  'Cristin Milioti',
  'David Henrie',
];

function Content({ updateScore, resetScore }) {
  const [gifs, setGifs] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch GIFs based on the names
    const getGifs = async () => {
      try {
        const gifPromises = defaultNames.map(name => fetchGiphyData(name)); // Fetch GIFs for all names
        const gifResults = await Promise.all(gifPromises);
        const flattenedGifs = gifResults.flat();
        setGifs(flattenedGifs);
      } catch (err) {
        setError("Failed to load GIFs from Giphy. Please try again later.");
        console.error("Error fetching Giphy data:", err);
      }
    };

    getGifs();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {hasWon && <div className="win-message">You Win!</div>}
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
