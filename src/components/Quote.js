// src/components/Quote.js
import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': 'Ey8Ks5QAmaqzDwO/o6srew==U1OwLNjoRiNyXkL2' // Replace with your actual API key
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // The API returns an array of quotes; we'll take the first one
      if (data.length > 0) {
        setQuote(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container" style={{ padding: '1rem', textAlign: 'center' }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {quote && (
        <div>
          <h2>"{quote.quote}"</h2>
          <p>- {quote.author}</p>
          <button onClick={fetchQuote}>New Quote</button>
        </div>
      )}
    </div>
  );
};

export default Quote;
