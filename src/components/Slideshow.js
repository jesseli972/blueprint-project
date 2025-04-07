// src/components/Slideshow.js
import React, { useState } from 'react';

const slides = [
  {
    title: "Project Overview",
    content: "This app fetches a random quote from an open-source API and displays it. It also includes a documentation slideshow describing the project process.",
  },
  {
    title: "Issues Encountered",
    content: "Encountered challenges with asynchronous data fetching and responsive design. Resolved by using React hooks and media queries.",
  },
  {
    title: "Demo Video",
    content: "Watch the demo video below:",
    // For demo purposes, using a placeholder YouTube embed URL. Replace with your actual video if needed.
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="slideshow" style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '2rem' }}>
      <h3>{slide.title}</h3>
      <p>{slide.content}</p>
      {slide.videoUrl && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            title="Demo Video"
            src={slide.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide} style={{ marginLeft: '1rem' }}>Next</button>
      </div>
    </div>
  );
};

export default Slideshow;
