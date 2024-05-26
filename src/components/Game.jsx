import React, { useState } from 'react';
import background from "../assets/background.png";
import backButton from "../assets/backButton.png";
import { useNavigate } from 'react-router-dom';
import pinkCard from "../assets/pinkCard.png";
import blueCard from "../assets/blueCard.png";
import finalScreen from "../assets/finalScreen.png"
import speakingMonkey from "../assets/speakingMonkey.png"

// Dummy data
const images = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig'];
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F'];

const Game = () => {
  const navigate = useNavigate();
  const [pinkCards, setPinkCards] = useState(images.map((img, idx) => ({ id: idx, image: img, flipped: false })));
  const [blueCards, setBlueCards] = useState(alphabets.map((alpha, idx) => ({ id: idx, alphabet: alpha, flipped: false })));
  const [selectedPinkCard, setSelectedPinkCard] = useState(null);
  const [selectedBlueCard, setSelectedBlueCard] = useState(null);
  const [points, setPoints] = useState(0);
  const [matchFound, setMatchFound] = useState(false);

  const handleBackClick = () => navigate('/');

  const handlePinkCardClick = (index) => {
    if (selectedPinkCard !== null || matchFound) return;
    const newPinkCards = [...pinkCards];
    newPinkCards[index].flipped = true;
    setPinkCards(newPinkCards);
    setSelectedPinkCard(newPinkCards[index]);
  };

  const handleBlueCardClick = (index) => {
    if (selectedBlueCard !== null || matchFound) return;
    const newBlueCards = [...blueCards];
    newBlueCards[index].flipped = true;
    setBlueCards(newBlueCards);
    setSelectedBlueCard(newBlueCards[index]);

    if (selectedPinkCard) {
      if (newBlueCards[index].alphabet[0].toLowerCase() === selectedPinkCard.image[0].toLowerCase()) {
        setPoints(points + 1);
        setMatchFound(true);
      } else {
        setTimeout(() => {
          const resetPinkCards = pinkCards.map(card => card.id === selectedPinkCard.id ? { ...card, flipped: false } : card);
          const resetBlueCards = blueCards.map(card => card.id === newBlueCards[index].id ? { ...card, flipped: false } : card);
          setPinkCards(resetPinkCards);
          setBlueCards(resetBlueCards);
          setSelectedPinkCard(null);
          setSelectedBlueCard(null);
        }, 500);
      }
    }
  };

  const handleNext = () => {
    setMatchFound(false);
    setPinkCards(pinkCards.filter(card => card.id !== selectedPinkCard.id));
    setBlueCards(blueCards.filter(card => card.id !== selectedBlueCard.id));
    setSelectedPinkCard(null);
    setSelectedBlueCard(null);
  };

  const progressPercentage = (points / 6) * 100;

  if (points === 6) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <img className='w-screen h-screen' src={background} alt='background' />
        <img className='absolute top-0 h-screen cursor-pointer' onClick={handleBackClick} src={finalScreen} alt='background' />
        <img className='absolute top-96 h-1/4' src={speakingMonkey} alt='background' />
        <h1 className='absolute text-4xl mb-4'>Congratulations!</h1>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen relative'>
      <img className='w-screen h-screen' src={background} alt='background' />
      <img onClick={handleBackClick} src={backButton} alt="back" className='absolute top-6 left-6 cursor-pointer px-4 py-2 w-32' />
      <div className='absolute top-0 w-screen h-screen flex flex-col justify-center items-center'>
        <div className='w-1/2 h-8 bg-gray-300 rounded-full overflow-hidden mb-4'>
          <div
            className='h-full bg-yellow-500 transition-all duration-500 ease-in-out'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {matchFound && (
          <div className='flex flex-col items-center mb-4'>
            <h2 className='text-2xl mb-2'>It's a match!</h2>
            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleNext}>Next</button>
          </div>
        )}
        <div className='flex gap-28'>
          <div className='grid grid-cols-3 gap-4'>
            {pinkCards.map((card, index) => (
              <div key={`pink-${card.id}`} className='w-44 h-56 cursor-pointer' onClick={() => handlePinkCardClick(index)}>
                {card.flipped ? <div className='w-full h-full flex justify-center items-center'>{card.image}</div> : <img src={pinkCard} alt='pinkCard' />}
              </div>
            ))}
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {blueCards.map((card, index) => (
              <div key={`blue-${card.id}`} className='w-44 h-56 cursor-pointer' onClick={() => handleBlueCardClick(index)}>
                {card.flipped ? <div className='w-full h-full flex justify-center items-center'>{card.alphabet}</div> : <img src={blueCard} alt='blueCard' />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
