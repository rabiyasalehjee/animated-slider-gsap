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
  const [backgroundImage, setBackgroundImage] = useState(cardData[0].image);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cards, setCards] = useState(cardData);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards.slice(1), prevCards[0]];
        setBackgroundImage(newCards[0].image);
        return newCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (image) => {
    setBackgroundImage(image);
  };

  return (
    <div className="landing-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="left-column"></div>
      <div className="right-column">
        <div className="card-slider">
          <div className="card-slider-wrapper" style={{ transform: `translateX(${isLoaded ? '0' : '100%'})` }}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${isLoaded ? 'card-open' : ''} ${index === 0 && isLoaded ? 'card-zoom' : ''}`}
                onClick={() => handleCardClick(card.image)}
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