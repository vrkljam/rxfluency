import React from "react";

const ModeSelector = ({ onSelect }) => {
  return (
    <div className="text-center mb-4">
      <h4 className="mb-3">Choose Quiz mode</h4>
      <button onClick={() => onSelect("brand_to_generic")}>
        Brand → Generic
      </button>
      <button onClick={() => onSelect("generic_to_brand")}>
        Generic → Brand
      </button>
    </div>
  );
};

export default ModeSelector;
