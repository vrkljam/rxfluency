// src/pages/PTReference.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

const PTReferenceTable = () => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    // Fetch PT drugs from your Django backend
    api
      .get("/pthealthcare/drugs/") // Adjust endpoint based on your DRF setup
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PT Drugs Reference Table</h1>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Generic Name</th>
            <th>Drug Class</th>
            <th>PT-Relevant Notes</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={drug.id}>
              <td>{index + 1}</td>
              <td>{drug.name}</td>
              <td>{drug.drug_class}</td>
              <td>
                {(drug.facts || []).map((fact, i) => (
                  <div key={i}>
                    <strong>{fact.category}:</strong> {fact.text}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PTReferenceTable;
