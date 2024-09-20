import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchGiphyData } from "./fetchGiphyData";
import './styles/Card.css'; // Optional: Add CSS for styling

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
  const shuffled = [...array]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Content() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const storedGifs = localStorage.getItem("giphyGifs");

    if (storedGifs) {
      setGifs(JSON.parse(storedGifs)); // Load from localStorage
    } else {
      const getGifs = async () => {
        const gifPromises = names.map(name => fetchGiphyData(name)); // Fetch GIFs for all names
        const gifResults = await Promise.all(gifPromises); // Wait for all GIFs to resolve
        const flattenedGifs = gifResults.flat(); // Flatten the array of arrays
        setGifs(flattenedGifs); // Set the GIFs to state
        localStorage.setItem("giphyGifs", JSON.stringify(flattenedGifs)); // Store GIFs in localStorage
      };
  
      getGifs();
    }
  }, []); // Only run once to fetch GIFs

  // Shuffle the cards when any card is clicked
  const handleShuffle = () => {
     const shuffledGifs = shuffleArray(gifs); // Shuffle the current GIFs
    setGifs(shuffledGifs); // Update state, triggering a re-render
  };
  return (
    <div className="cards">
      {gifs.map((gif) => (
        <Card
          key={gif.id}
          imageSrc={gif.images.fixed_height.url}
          name={gif.title}
          onClick={handleShuffle} // Shuffle cards when any card is clicked
        />
      ))}
    </div>
  );
}

export default Content;