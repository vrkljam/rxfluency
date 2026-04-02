// components/ClassLegend.jsx
import { PHARMA_SYSTEM } from "../../utils/pharma";

const ClassLegend = () => (
  <div className="card p-3 mt-3">
    <h6>Drug Class Legend</h6>
    <div className="d-flex flex-wrap gap-2 mt-2">
      {Object.entries(PHARMA_SYSTEM).map(([key, val]) => (
        <span
          key={key}
          className="badge badge-custom"
          style={{ background: val.gradient }}
        >
          <i className={`bi ${val.icon}`}></i> {val.label}
        </span>
      ))}
    </div>
  </div>
);

export default ClassLegend;
