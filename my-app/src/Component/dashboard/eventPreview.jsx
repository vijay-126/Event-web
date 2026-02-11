import styles from "./dashboard.module.css";

export default function EventPreview({ event }) {
  if (!event) return <div>Select an event</div>;

  return (
    <div className={styles.preview}>
      <h3>{event.title}</h3>

      <p><strong>Venue:</strong> {event.venueAddress}</p>
      <p><strong>City:</strong> {event.city}</p>
      <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
      <img
  src={event.imageUrl}
  alt={event.title}
  className={styles.previewImage}
/>

      <p>{event.description}</p>
    </div>
  );
}
