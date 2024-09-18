import React from "react";
import Card from "./components/Card";
import { fetchGiphyData } from "./fetchGiphyData";
import './styles/Card.css'; // Optional: Add CSS for styling
import { useEffect, useState} from "react";

const names = [
    'Ted Mosby',
    'Barney Stinson',
    'Robin Scherbatsky',
    'Lily Aldrin',
    'Marshall Eriksen',
    'Cristin Milioti',
    'David Henrie'
  ];
  
  function Content() {
    const [gifs, setGifs] = useState([]);
  
    useEffect(() => {
      const getGifs = async () => {
        const gifPromises = names.map(name => fetchGiphyData(name));
        const gifResults = await Promise.all(gifPromises);
        setGifs(gifResults.flat()); // Flatten the array of arrays
      };
  
      getGifs();
    }, []);
  
    return (
      <div className="cards">
        {gifs.map((gif) => (
          <Card
            key={gif.id}
            imageSrc={gif.images.fixed_height.url}
            name={gif.title}
          />
        ))}
      </div>
    );
  }
  
  export default Content;