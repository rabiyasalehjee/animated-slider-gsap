import React, { useState, useEffect } from 'react';
import './main.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const cardData = [
  { id: 1, image: img1, title: 'Card 1' },
  { id: 2, image: img2, title: 'Card 2' },
  { id: 3, image: img3, title: 'Card 3' },
  { id: 4, image: img4, title: 'Card 4' },
  { id: 5, image: img5, title: 'Card 5' },
];

const Main = () => {
  const [backgroundImage, setBackgroundImage] = useState(img5); // Initial background
  const [cards, setCards] = useState(cardData); // Initial card order
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const interval = setInterval(() => {
      // Update the background image to the first card's image BEFORE the transition
      setBackgroundImage(cards[0].image);

      // After a short delay, update the card order
      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards.slice(1), prevCards[0]];
          return newCards;
        });
      }, 500); // Adjust this delay to match the transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, [cards]); // Add `cards` as a dependency

  const handleCardClick = (image) => {
    setBackgroundImage(image);
  };

  return (
    <div className="landing-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="left-column"></div>
      <div className="right-column">
        <div className="card-slider">
          <div className="card-slider-wrapper">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${isLoaded ? 'card-open' : ''}`}
                onClick={() => handleCardClick(card.image)}
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;