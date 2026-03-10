import { useEffect, useState } from "react";
import api from "../../api/api";
import FlashcardSetup from "./FlashcardSetup";
import FlashcardSession from "./FlashcardSession";
import SessionComplete from "./SessionComplete";

const Flashcards = () => {
  const [limit, setLimit] = useState(null);
  const [top200Only, setTop200Only] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [confidentCards, setConfidentCards] = useState([]);
  const [ratings, setRatings] = useState({});
  const [view, setView] = useState("active");
  const [sessionComplete, setSessionComplete] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customCount, setCustomCount] = useState("");
  const [cards, setCards] = useState([]);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [weakShuffleMode, setWeakShuffleMode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);

  // --- Fetch cards ---
  const fetchCards = async (n) => {
    setLoading(true);
    let url = "/drugs/";
    let params = [];

    if (top200Only) params.push("is_top_200=true");
    if (selectedClasses.length) {
      selectedClasses.forEach((c) => params.push(`classes=${c}`));
    }
    if (params.length) url += "?" + params.join("&");

    const res = await api.get(url);

    const shuffled = res.data.sort(() => 0.5 - Math.random());
    const safeCount = Math.min(n, shuffled.length);
    const selected = shuffled.slice(0, safeCount);

    setActiveCards(selected);
    setConfidentCards([]);
    setRatings({});
    setSessionComplete(false);
    setCards(shuffled.slice(0, safeCount));
    setCurrentIndex(0);
    setFlipped(false);
    setLoading(false);
  };

  const resetSession = () => {
    setLimit(null);
    setActiveCards([]);
    setConfidentCards([]);
    setRatings({});
    setCurrentIndex(0);
    setFlipped(false);
    setSessionComplete(false);
    setSelectedClasses([]);
  };

  const toggleClass = (id) => {
    if (selectedClasses.includes(id)) {
      setSelectedClasses(selectedClasses.filter((i) => i !== id));
    } else {
      setSelectedClasses([...selectedClasses, id]);
    }
  };

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/drugclasses/");
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to load classes", err);
      }
    };
    fetchClasses();
  }, []);

  // Filter classes for search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredClasses(classes);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const matches = classes.filter((c) =>
        c.name.toLowerCase().includes(lowerQuery),
      );
      setFilteredClasses(matches);
    }
  }, [searchQuery, classes]);

  // Launch confetti
  useEffect(() => {
    if (sessionComplete) {
      import("./SessionComplete").then(({ launchBouncyPharmaConfetti }) =>
        launchBouncyPharmaConfetti(),
      );
    }
  }, [sessionComplete]);

  if (!limit) {
    return (
      <FlashcardSetup
        top200Only={top200Only}
        setTop200Only={setTop200Only}
        classes={classes}
        filteredClasses={filteredClasses}
        selectedClasses={selectedClasses}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleClass={toggleClass}
        fetchCards={fetchCards}
        setLimit={setLimit}
        customCount={customCount}
        setCustomCount={setCustomCount}
      />
    );
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" />
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <SessionComplete
        limit={limit}
        setView={(view) => {
          setView(view);
          setSessionComplete(false); // reset so FlashcardSession shows
        }}
        resetSession={resetSession}
      />
    );
  }

  return (
    <FlashcardSession
      activeCards={activeCards}
      setActiveCards={setActiveCards}
      confidentCards={confidentCards}
      setConfidentCards={setConfidentCards}
      view={view}
      setView={setView}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      flipped={flipped}
      setFlipped={setFlipped}
      animatingOut={animatingOut}
      setAnimatingOut={setAnimatingOut}
      weakShuffleMode={weakShuffleMode}
      isSpinning={isSpinning}
      setIsSpinning={setIsSpinning}
      ratings={ratings}
      setRatings={setRatings}
      setSessionComplete={setSessionComplete}
    />
  );
};

export default Flashcards;
