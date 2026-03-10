import React, { useEffect } from "react";
import Flashcard from "./Flashcard";
import ConfidenceButtons from "./ConfidenceButtons";
import ProgressBar from "./ProgressBar";
import SessionHeader from "./SessionHeader";
import { launchBouncyPharmaConfetti } from "./SessionComplete";

const FlashcardSession = ({
  activeCards = [],
  setConfidentCards,
  confidentCards = [],
  setActiveCards,
  view,
  setView,
  currentIndex,
  setCurrentIndex,
  flipped,
  setFlipped,
  isSpinning,
  spinShuffle,
  limit,
  sessionComplete,
  setSessionComplete,
  resetSession,
}) => {
  // Determine which list is active
  let currentList = view === "active" ? activeCards : confidentCards;

  // Safe card access
  const card = currentList[currentIndex] || null;

  // inside FlashcardSession
  // const handleRate = (rating) => {
  //   if (!card) return;

  // Move card to confident group if rating is good or easy
  // if (rating >= 4) {
  // 4 = "Good", 5 = "Easy"
  //   setConfidentCards((prev) => [...prev, card]);
  //   setActiveCards((prev) => prev.filter((c) => c.id !== card.id));
  // }

  // You could also store ratings if needed
  // setRatings(prev => ({ ...prev, [card.id]: rating }));

  // Automatically go to next card
  //   nextCard();
  // };

  const handleRate = (rating) => {
    if (!card) return; // safety check

    // Remove current card from activeCards if rating is high enough
    if (rating >= 4) {
      const remainingActive = activeCards.filter((c, i) => i !== currentIndex);
      const newConfident = [...confidentCards, card];

      setActiveCards(remainingActive);
      setConfidentCards(newConfident);

      // If no more active cards, mark session complete
      if (remainingActive.length === 0) {
        setSessionComplete(true);
      } else {
        // Reset index safely
        setCurrentIndex((prev) => (prev >= remainingActive.length ? 0 : prev));
      }
    }

    // Optional: you could track ratings per card if you want
    // setRatings((prev) => ({ ...prev, [card.id]: rating }));

    // Flip back to front for next card
    setFlipped(false);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCards, confidentCards, view, setCurrentIndex]);

  // Clamp index if list shrinks
  useEffect(() => {
    if (currentIndex >= currentList.length && currentList.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentList, currentIndex, setCurrentIndex]);

  const prevCard = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : currentList.length - 1));
    setFlipped(false);
  };

  const nextCard = () => {
    setCurrentIndex((i) => (i < currentList.length - 1 ? i + 1 : 0));
    setFlipped(false);
  };

  useEffect(() => {
    if (sessionComplete) {
      launchBouncyPharmaConfetti();
    }
  }, [sessionComplete]);

  if (view === "active" && currentList.length === 0) {
    // All cards rated confident → session complete
    if (!sessionComplete) setSessionComplete(true);
    return null; // don't render cards
  }

  return (
    <div className="container mt-5 p-4 text-center">
      {/* Session header with badges and shuffle */}
      <SessionHeader
        activeCards={activeCards}
        confidentCards={confidentCards}
        view={view}
        setView={setView}
        spinShuffle={spinShuffle}
      />

      {/* Progress bar */}
      <ProgressBar confidentCount={confidentCards.length} total={limit} />

      {/* Flashcard */}
      <div
        className="flashcard-container mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <Flashcard
          card={card}
          flipped={flipped}
          setFlipped={setFlipped}
          isSpinning={isSpinning}
        />
      </div>

      {/* Card index */}
      <div className="mt-3 text-muted">
        Card {currentIndex + 1} of {currentList.length}
      </div>

      {/* Confidence buttons for active view */}
      {view === "active" && (
        <ConfidenceButtons onRate={handleRate} mode="labeled" />
      )}
      {/* {view === "active" && (
        <ConfidenceButtons
          card={card}
          currentIndex={currentIndex}
          onRate={handleRate} // ✅ pass the function
        />
      )} */}

      {/* Navigation buttons */}
      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={prevCard}>
          Prev
        </button>
        <button className="btn btn-primary" onClick={nextCard}>
          Next
        </button>
      </div>

      {/* End session */}
      <div className="mt-4">
        <button className="btn btn-outline-danger" onClick={resetSession}>
          End Session
        </button>
      </div>
    </div>
  );
};

export default FlashcardSession;
