const apiKey = 'kFv0MZ7TpcQGxj6z2Za4pr8ym6y099ZW';  
const apiUrl = 'https://api.giphy.com/v1/gifs/search';                     
export const fetchGiphyData = async (query) => {
  try {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json();
    return data.data; // Return the array of GIF objects
  } catch (error) {
    console.error('Error fetching Giphy data:', error);
    return [];
  }
};