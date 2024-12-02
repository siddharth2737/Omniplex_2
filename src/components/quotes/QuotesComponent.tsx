import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuotesComponent: React.FC = () => {
  const [quote, setQuote] = useState<string>("");

  
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        "https://motivational-content.p.rapidapi.com/quotes", 
        {
          headers: {
            'X-RapidAPI-Host': 'motivational-content.p.rapidapi.com',
            'X-RapidAPI-Key': 'key',
          },
        }
      );
      console.log(response.data); 
      const randomQuote = response.data[Math.floor(Math.random() * response.data.length)].quote;
      setQuote(randomQuote || "No quote available");
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setQuote("Failed to fetch quote");
    }
  };

  useEffect(() => {
    fetchRandomQuote(); 
  }, []);

  return (
    <div>
      <h1></h1>
      <p style={{ fontStyle: 'italic', color: '#555', textAlign: 'center' }}>
        {quote || "Loading quote..."} 
      </p>
    </div>
  );
};

export default QuotesComponent;
