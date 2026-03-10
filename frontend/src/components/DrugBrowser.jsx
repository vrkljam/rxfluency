import { useState, useEffect } from "react";
import api from "../api/api";

const DrugBrowser = () => {
  const [drugs, setDrugs] = useState([]);
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  // Fetch classes once
  useEffect(() => {
    api
      .get("/drugclasses/")
      .then((res) => setClasses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch drugs whenever search or selectedClass changes
  useEffect(() => {
    fetchDrugs();
  }, [search, selectedClass]);

  const fetchDrugs = async () => {
    try {
      let url = "/drugs/?";

      if (search) url += `search=${search}&`;
      if (selectedClass) url += `classes=${selectedClass}&`; // ✅ use id

      const res = await api.get(url);
      setDrugs(res.data);
    } catch (err) {
      console.error("Error fetching drugs:", err);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by brand or generic..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      {drugs.map((d) => (
        <div key={d.id}>{d.generic_name}</div>
      ))}
    </>
  );
};

export default DrugBrowser;
