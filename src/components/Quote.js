import React, { useState, useEffect } from 'react';

const Quote = () => {
  // State to hold the array of quotes from the API
  const [quotes, setQuotes] = useState([]);
  // State to hold the currently displayed quote
  const [currentQuote, setCurrentQuote] = useState(null);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch quotes from ZenQuotes API
  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // Cache the fetched quotes in state
      setQuotes(data);

      // Immediately set a random quote from the fetched list
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuote(data[randomIndex]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch quotes on mount and refresh every hour (3600000 ms)
  useEffect(() => {
    fetchQuotes();

    const interval = setInterval(() => {
      fetchQuotes();
    }, 3600000); // Refresh quotes every hour

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to display a new quote from the cached quotes
  const handleNewQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  return (
    <div className="quote-container" style={{ padding: '1rem', textAlign: 'center' }}>
      {loading && <p>Loading quotes...</p>}
      {error && <p>Error: {error}</p>}
      {currentQuote && (
        <div>
          {/* Adjust keys based on the API's response structure.
              ZenQuotes typically returns an object with properties like "q" for the quote and "a" for the author. */}
          <h2>"{currentQuote.q}"</h2>
          <p>- {currentQuote.a}</p>
          <button onClick={handleNewQuote}>New Quote</button>
        </div>
      )}
    </div>
  );
};

export default Quote;
