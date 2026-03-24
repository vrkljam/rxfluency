import React from "react";

const CARD_SIZE = 90;

const MemoryCard = ({ value, isFlipped, isMatched, onClick }) => {
  const getFontSize = (text) => {
    if (text.length > 18) return 10;
    if (text.length > 14) return 12;
    return 13;
  };
  return (
    <div
      onClick={onClick}
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      {/* Inner flip container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          boxShadow: isMatched
            ? "0 0 15px 5px gold"
            : "0 0 5px rgba(0,0,0,0.2)",
          borderRadius: 8,
        }}
      >
        {/* BACK SIDE (capsule) - shows initially */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#fbbf24",
            color: "#000",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 28,
          }}
        >
          💊
        </div>

        {/* FRONT SIDE (drug name) - revealed when flipped */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: getFontSize(value),
            padding: "6px",
            textAlign: "center",
            wordBreak: "break-word",
            overflow: "hidden",
            lineHeight: "1.1",
            transform: "rotateY(180deg)", // rotate front
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
