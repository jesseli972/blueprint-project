import React, { useState, useEffect } from "react";

const Quote = () => {
  // State to hold the array of quotes from the API
  const [quotes, setQuotes] = useState([]);
  // State to hold the currently displayed quote
  const [currentQuote, setCurrentQuote] = useState(null);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Function to fetch quotes from ZenQuotes API
  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/"
      );
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

  //Function to save favorites
  const handleSaveFavorite = () => {
    if (
      currentQuote &&
      !favorites.find(
        (fav) => fav.q === currentQuote.q && fav.a === currentQuote.a
      )
    ) {
      setFavorites((prev) => [...prev, currentQuote]);
    }
  };

  //function to remove favorites
  const handleRemoveFavorite = (index) => {
    setFavorites((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="quote-container"
      style={{ padding: "1rem", textAlign: "center" }}
    >
      {loading && <p>Loading quotes...</p>}
      {error && <p>Error: {error}</p>}
      {currentQuote && (
        <div>
          <h2>"{currentQuote.q}"</h2>
          <p>- {currentQuote.a}</p>
          <button onClick={handleNewQuote}>New Quote</button>
          <button onClick={handleSaveFavorite} style={{ marginLeft: "0.5rem" }}>
            ❤️ Save
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Saved Quotes</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {favorites.map((fav, idx) => (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <blockquote>
                  "{fav.q}" — {fav.a}
                </blockquote>
                <button onClick={() => handleRemoveFavorite(idx)}>
                  🗑 Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quote;
