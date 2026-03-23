import { useState, useEffect } from "react";
import axios from "axios";

const MemoryGrid = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // New stats
  const [flipCount, setFlipCount] = useState(0);
  const [sessionWins, setSessionWins] = useState(0);

  useEffect(() => {
    axios.get("/api/drug-pairs?limit=8").then((res) => {
      const pairs = res.data;
      const gridCards = pairs.flatMap((pair) => [
        { id: pair.id + "-b", value: pair.brand, pairId: pair.id },
        { id: pair.id + "-g", value: pair.generic, pairId: pair.id },
      ]);
      setCards(shuffle(gridCards));
    });
  }, []);

  // shuffle function
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleClick = (card) => {
    if (flipped.length === 2 || matched.includes(card.pairId)) return;

    setFlipped([...flipped, card]);
    setFlipCount((prev) => prev + 1); // increment flip counter

    // Detect win
    useEffect(() => {
      if (matched.length === cards.length / 2 && cards.length > 0) {
        setSessionWins((prev) => prev + 1);
        alert(`You cleared the grid in ${flipCount} flips!`);
        // Reset board for next round
        const resetCards = shuffle(cards);
        setMatched([]);
        setFlipped([]);
        setFlipCount(0);
        setCards(resetCards);
      }
    }, [matched, cards, flipCount]);
  };
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Flips:</strong> {flipCount} | <strong>Session Wins:</strong>{" "}
        {sessionWins}
      </div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {cards.map((card) => {
          const isFlipped =
            flipped.includes(card) || matched.includes(card.pairId);
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card)}
              style={{
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isFlipped ? "#2563eb" : "#ccc",
                color: isFlipped ? "#fff" : "#000",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {isFlipped ? card.value : "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGrid;
