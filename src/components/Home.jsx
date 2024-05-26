import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.png";
import speakingMonkey from "../assets/speakingMonkey.png";
import dialogueBox from "../assets/dialogueBox.png";
import { Typewriter } from 'react-simple-typewriter';
import startButton from "../assets/startButton.png";
import nextButton from "../assets/nextButton.png";
import yesButton from "../assets/yesButton.png";
import backButton from "../assets/backButton.png";
import playButton from "../assets/playButton.png";
import introCard1 from "../assets/introCard1.png";
import introCard2 from "../assets/introCard2.png";
import introCard3 from "../assets/introCard3.png";
import numberOne from "../assets/numberOne.png";
import numberTwoBackground from "../assets/numberTwoBackground.png";
import numberTwo from "../assets/numberTwo.png";
import numberThreeBackground from "../assets/numberThreeBackground.png";

export const Home = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleStartClick = () => setStep(1);
  const handleNextClick = () => setStep(2);
  const handleYesClick = () => setStep(3);
  const handleBackClick = () => setStep(step => Math.max(step - 1, 0)); // Ensure step doesn't go below 0

  const getWords = () => {
    switch (step) {
      case 1:
        return ['My name is Mizo and I love bananas ! 🍌'];
      case 2:
        return ['Can you help me get some? 🤔'];
      case 3:
        return ['Thank you! You are amazing!'];
      default:
        return ['Welcome Kido !'];
    }
  };

  return (
    <div className='w-screen h-screen relative'>
      <img className='w-screen h-screen' src={background} alt='background' />
      {step < 3 && (
        <>
          <img className='absolute h-1/2 top-52 left-96' src={speakingMonkey} alt='speakingMonkey' />
          <img className='absolute h-1/3 w-1/3 top-10 right-96 left-96 py-6' src={dialogueBox} alt='dialogueBox' />
          <div className='absolute h-1/3 w-1/3 top-20 left-96 px-24 py-8 text-2xl text-blue-600 font-extrabold'>
            <Typewriter
              key={step} // Add key to force re-mount
              words={getWords()}
              loop={1}
              cursor
              cursorStyle=''
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </>
      )}
      {step === 3 && (
        <div className='absolute top-48'>
          <div className='w-screen h-3/4 flex justify-around items-center'>
            <div className='bg-white w-80 h-96 rounded-3xl flex flex-col items-center relative'>
              <img src={introCard1} alt="intro" className='w-1/2' />
              <h1 className='text-blue-600 font-extrabold text-3xl'>Select a pink card.</h1>
              <p className='text-gray-500'>It has images.</p>
              <img src={numberOne} alt='numOne' className='absolute left-0 bottom-16' />
            </div>
            <div className='bg-white w-80 h-96 rounded-3xl flex flex-col items-center relative'>
              <img src={introCard2} alt="intro" className='w-1/2' />
              <h1 className='text-blue-600 font-extrabold text-3xl'>Select a blue card.</h1>
              <p className='text-gray-500'>It has alpabets.</p>
              <img src={numberTwoBackground} alt='numOne' className='absolute left-0 bottom-16' />
              <img src={numberTwo} alt='numTwo' className='absolute left-1 bottom-20'/>
            </div>
            <div className='bg-white w-80 h-96 rounded-3xl flex flex-col items-center relative'>
              <img src={introCard3} alt="intro" className='w-1/2 h-64' />
              <div className='text-center absolute bottom-24'>
                <p className='text-gray-500'>If they're same</p>
                <h1 className='text-blue-600 font-extrabold text-3xl'>It's a match.</h1>
                <p className='text-gray-500'>Otherwise retry</p>
              </div>
              <img src={numberThreeBackground} alt='numOne' className='absolute left-0 bottom-16' />
              <p className='text-white absolute left-1 bottom-20 text-3xl font-extrabold'>03</p>
            </div>
          </div>
        </div>
      )}
      {step > 0 && (
        <img onClick={handleBackClick} src={backButton} alt="back" className='absolute top-6 left-6 cursor-pointer px-4 py-2 w-44' />
      )}
      {step === 0 && (
        <img src={startButton} alt='start' className='absolute bottom-10 right-10 cursor-pointer' onClick={handleStartClick} />
      )}
      {step === 1 && (
        <img src={nextButton} alt='next' className='absolute bottom-10 right-10 cursor-pointer' onClick={handleNextClick} />
      )}
      {step === 2 && (
        <img src={yesButton} alt='yes' className='absolute bottom-10 right-10 cursor-pointer' onClick={handleYesClick} />
      )}
      {step === 3 && (
        <img src={playButton} alt='play' className='absolute bottom-10 right-10 cursor-pointer' onClick={() => navigate('/game')} />
      )}
    </div>
  );
}

export default Home;
