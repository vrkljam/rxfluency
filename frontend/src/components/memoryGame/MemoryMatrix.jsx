import { useState, useEffect } from "react";
import axios from "axios";
import MemoryCard from "./MemoryCard";

const MemoryMatrix = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [flipCount, setFlipCount] = useState(0);
  const [sessionWins, setSessionWins] = useState(0);

  const [top200Only, setTop200Only] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  // Fetch drug classes for dropdown
  useEffect(() => {
    axios.get("/api/drugclasses/").then((res) => setClasses(res.data));
  }, []);

  // Fetch cards from API
  useEffect(() => {
    let url = `/api/drug-pairs?limit=8`;
    if (top200Only) url += "&top200=true";
    if (selectedClass) url += `&class=${selectedClass}`;

    axios.get(url).then((res) => {
      const pairs = res.data;
      const gridCards = pairs.flatMap((pair) => [
        { id: pair.id + "-b", value: pair.brand, pairId: pair.id },
        { id: pair.id + "-g", value: pair.generic, pairId: pair.id },
      ]);
      setCards(shuffle(gridCards));
      setFlipped([]);
      setMatched([]);
      setFlipCount(0);
    });
  }, [top200Only, selectedClass]);

  // shuffle helper
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  // handle card click
  const handleClick = (card) => {
    if (
      flipped.length === 2 ||
      matched.includes(card.pairId) ||
      flipped.find((c) => c.id === card.id)
    ) {
      return;
    }

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);
    setFlipCount((prev) => prev + 1);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // correct match
        setMatched([...matched, first.pairId]);
      }

      // reset flipped after short delay
      setTimeout(() => setFlipped([]), 700);
    }
  };

  // Detect win
  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length / 2) {
      setSessionWins((prev) => prev + 1);
      alert(`You cleared the grid in ${flipCount} flips!`);
      const resetCards = shuffle(cards);
      setCards(resetCards);
      setMatched([]);
      setFlipped([]);
      setFlipCount(0);
    }
  }, [matched, cards, flipCount]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Filters */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "15px" }}>
          <input
            type="checkbox"
            checked={top200Only}
            onChange={() => setTop200Only((prev) => !prev)}
          />
          Top 200 Only
        </label>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Flips:</strong> {flipCount} | <strong>Session Wins:</strong>{" "}
        {sessionWins}
      </div>

      {/* Memory Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "6px",
          maxWidth: "360px",
          margin: "0 auto",
        }}
      >
        {cards.map((card) => {
          const isFlipped =
            flipped.includes(card) || matched.includes(card.pairId);

          return (
            <MemoryCard
              key={card.id}
              value={card.value}
              isFlipped={isFlipped}
              isMatched={matched.includes(card.pairId)}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemoryMatrix;
