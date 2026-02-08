import React from "react";
import styles from "./dashboard.module.css";

export default function EventTable({ events, onSelect, selectedId }) {
  return (
    <table className={styles.table}>
  <thead>
    <tr className={styles.tableRow}>
      <th className={styles.tableHeader}>Date</th>
      <th className={styles.tableHeader}>Title</th>
      <th className={styles.tableHeader}>Venue</th>
      <th className={styles.tableHeader}>City</th>
    </tr>
  </thead>
  <tbody>
    {events.length === 0 ? (
      <tr className={styles.tableRow}>
        <td colSpan={5} className={styles.noEvents}>No events found</td>
      </tr>
    ) : (
      events.map((event) => (
        <tr
          key={event._id}
          onClick={() => onSelect(event)}
          className={`${styles.tableRow} ${selectedId === event._id ? styles.selectedRow : ""}`}
        >
          <td className={styles.tableCell}>{new Date(event.dateTime).toLocaleDateString()}</td>
          <td className={styles.tableCell}>{event.title}</td>
          <td className={styles.tableCell}>{event.venueName}</td>
          <td className={styles.tableCell}>{event.city}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

  );
}
