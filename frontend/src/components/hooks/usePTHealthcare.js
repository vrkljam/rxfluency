// src/hooks/usePTHealthcare.js
import { useState, useEffect } from "react";
import api from "../api/api";

export const usePTHealthcare = () => {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    const fetchDrugs = async () => {
      const res = await api.get("/pthealthcare/");
      setDrugs(res.data);
    };
    fetchDrugs();
  }, []);

  return { drugs, selectedDrug, setSelectedDrug };
};
