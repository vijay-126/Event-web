import { useState } from "react";
import styles from "./style.module.css";

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !consent) {
      alert("Email and consent are required");
      return;
    }

    await fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        consent,
        eventId: event._id,
        eventUrl: event.originalUrl,
      }),
    });

    window.location.href = event.originalUrl;
  }

  return (
    <div className={styles.container}>
      <div className={styles.eventCard}>
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className={styles.eventImage}
          />
        )}

        <h2 className={styles.eventTitle}>{event.title}</h2>
        <p className={styles.eventDate}>
          {new Date(event.dateTime).toLocaleString()}
        </p>
        <p className={styles.eventVenue}>{event.venueName}</p>
        <p className={styles.eventDescription}>{event.description}</p>
        <p className={styles.eventSource}>Source: {event.source}</p>

        <button
          className={styles.eventButton}
          onClick={() => setOpen(true)}
        >
          GET TICKETS
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Enter your email</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I agree to receive updates via email
              </label>

              <div className={styles.actions}>
                <button type="submit" className={styles.eventButton}>
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={styles.cancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
