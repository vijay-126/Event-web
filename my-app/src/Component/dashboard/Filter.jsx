import { useState } from "react";
import styles  from "./dashboard.module.css"
export default function Filters({ onChange }) {
  const [city, setCity] = useState("Sydney");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    onChange({ city, keyword, startDate, endDate });
  };

  return (
    <div className={`${styles.filters}`}>
      <label>City:</label>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option>Sydney</option>
        <option>Melbourne</option>
        <option>Brisbane</option>
      </select>

      <label>Keyword:</label>
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={handleApply}>Apply Filters</button>
    </div>
  );
}
