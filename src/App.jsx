import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FallingPetals from './components/FallingPetals';
import Hero from './components/Hero';
import MoodSelector from './components/MoodSelector';
import CatCafe from './components/CatCafe';
import CatPolaroids from './components/CatPolaroids';
import HappinessGarden from './components/HappinessGarden';
import JarOfSunshine from './components/JarOfSunshine';
import FishCatcherGame from './components/FishCatcherGame';
import BreathingCorner from './components/BreathingCorner';
import WorryRelease from './components/WorryRelease';
import CozyTeaStation from './components/CozyTeaStation';
import CarePackage from './components/CarePackage';
import LetterEnvelope from './components/LetterEnvelope';
import CornerCompanionCat from './components/CornerCompanionCat';
import Footer from './components/Footer';
import { useSanctuaryState } from './hooks/useSanctuaryState';
import { sound } from './utils/soundEngine';

export default function App() {
  const {
    userName,
    setUserName,
    activeRoom,
    setActiveRoom,
    currentMood,
    setCurrentMood,
    catStats,
    updateCat,
    plantedFlowers,
    addPlantedFlower,
    fishHighScore,
    unlockedGoldenTreat,
    recordFishScore,
    openedSunshines,
    markSunshineOpened,
    hasReadLetter,
    markLetterRead
  } = useSanctuaryState();

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Global Letter Modal State (Triggered exclusively from Hero)
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  const isCalmRoom = activeRoom === 'calm';

  const handleStartJourney = () => {
    if (!isMusicPlaying) {
      sound.startBgm();
      setIsMusicPlaying(true);
    }
    setActiveRoom('cafe');
  };

  const handleOpenLetter = () => {
    sound.init();
    setIsLetterModalOpen(true);
    if (!hasReadLetter) {
      markLetterRead();
      sound.playSparkle();
    }
  };

  const handleCloseLetter = () => {
    setIsLetterModalOpen(false);
  };

  return (
    <div
      className={`relative min-h-dvh transition-colors duration-700 selection:bg-pink-300 selection:text-pink-950 ${
        isCalmRoom
          ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-indigo-50'
          : 'bg-gradient-to-b from-[#FFF5F8] via-[#FAF5FF] to-[#FFF0F5] text-stone-800'
      }`}
    >
      {/* Background Particles: Sakura Petals in Day Rooms / Twinkling Stars in Calm Room */}
      <FallingPetals isEnabled={petalsEnabled} mode={isCalmRoom ? 'stars' : 'petals'} />

      {/* Top Navbar & Mobile Bottom Tab Bar */}
      <Navbar
        visitorName={userName}
        setVisitorName={setUserName}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        unlockedGoldenTreat={unlockedGoldenTreat}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        petalsEnabled={petalsEnabled}
        setPetalsEnabled={setPetalsEnabled}
      />

      {/* 4 State-Based Sanctuary Rooms */}
      <main className="relative z-20 pb-24 md:pb-8 max-w-6xl mx-auto px-3 sm:px-6">
        {/* ROOM 1: Cozy Lounge */}
        {activeRoom === 'lounge' && (
          <div key="room-lounge" className="animate-room-enter">
            <Hero
              visitorName={userName}
              onStartJourney={handleStartJourney}
              onOpenLetter={handleOpenLetter}
              hasReadLetter={hasReadLetter}
            />
            <MoodSelector
              visitorName={userName}
              currentMood={currentMood}
              setCurrentMood={setCurrentMood}
              setActiveRoom={setActiveRoom}
            />
            <CozyTeaStation visitorName={userName} />
          </div>
        )}

        {/* ROOM 2: Cat Café & Play */}
        {activeRoom === 'cafe' && (
          <div key="room-cafe" className="animate-room-enter pt-4">
            <CatCafe
              visitorName={userName}
              catStats={catStats}
              updateCat={updateCat}
              unlockedGoldenTreat={unlockedGoldenTreat}
            />
            <CatPolaroids visitorName={userName} />
            <FishCatcherGame
              visitorName={userName}
              fishHighScore={fishHighScore}
              recordFishScore={recordFishScore}
              unlockedGoldenTreat={unlockedGoldenTreat}
            />
          </div>
        )}

        {/* ROOM 3: Starlight Calm */}
        {activeRoom === 'calm' && (
          <div key="room-calm" className="animate-room-enter pt-4">
            <BreathingCorner visitorName={userName} isDarkRoom={true} />
            <WorryRelease visitorName={userName} isDarkRoom={true} />
          </div>
        )}

        {/* ROOM 4: Garden & Keepsakes */}
        {activeRoom === 'keepsakes' && (
          <div key="room-keepsakes" className="animate-room-enter pt-4">
            <HappinessGarden
              visitorName={userName}
              plantedFlowers={plantedFlowers}
              addPlantedFlower={addPlantedFlower}
            />
            <JarOfSunshine
              visitorName={userName}
              openedSunshines={openedSunshines}
              markSunshineOpened={markSunshineOpened}
            />
            <CarePackage visitorName={userName} />
          </div>
        )}
      </main>

      {/* Contextual Companion Cat (Positioned above mobile bottom bar) */}
      <CornerCompanionCat
        visitorName={userName}
        activeRoom={activeRoom}
        currentMood={currentMood}
        unlockedGoldenTreat={unlockedGoldenTreat}
        catStats={catStats}
        isDarkRoom={isCalmRoom}
      />

      {/* Footer */}
      <Footer visitorName={userName} isDarkRoom={isCalmRoom} setActiveRoom={setActiveRoom} />

      {/* Interactive Global Letter Modal Portaled to document.body */}
      <LetterEnvelope
        isOpen={isLetterModalOpen}
        onClose={handleCloseLetter}
        visitorName={userName}
        unlockedGoldenTreat={unlockedGoldenTreat}
      />
    </div>
  );
}
