import { useState, useEffect } from "react";
import api from "../../api/api";

export const useDrugClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);

  // Fetch classes once
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

  // Filter classes whenever search changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredClasses(classes);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredClasses(
        classes.filter((c) => c.name.toLowerCase().includes(lowerQuery)),
      );
    }
  }, [searchQuery, classes]);

  // Toggle selection of a class
  const toggleClass = (id) => {
    if (selectedClasses.includes(id)) {
      setSelectedClasses(selectedClasses.filter((i) => i !== id));
    } else {
      setSelectedClasses([...selectedClasses, id]);
    }
  };

  // Group classes by type
  const groupedClasses = classes.reduce((groups, cls) => {
    const type = cls.class_type || "OTHER";
    if (!groups[type]) groups[type] = [];
    groups[type].push(cls);
    return groups;
  }, {});

  const clearClasses = () => {
    setSelectedClasses([]);
  };

  return {
    classes,
    filteredClasses,
    selectedClasses,
    searchQuery,
    setSearchQuery,
    toggleClass,
    groupedClasses,
    clearClasses,
  };
};
