import UserLayout from '@/layout/userLayout/index.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '@/Component/eventcard/index.jsx';
import styles from "./styles.module.css";

function Listing() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // No token needed to fetch events
        const res = await axios.get(`${backendUrl}/events`);
        setEvents(res.data.events || []);
        console.log("response", res.data.events);
      } catch (err) {
        console.error("Error fetching events:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <UserLayout>
      <div className={styles.container}>
  <h1 className={styles.heading}>Upcoming Events</h1>


        {loading ? (
          <p className={styles.msgEvent}>Loading events...</p>
        ) : events.length === 0 ? (
          <p className={styles.msgEvent}>No events found.</p>
        ) : (
          <div className={styles.eventsGrid}>
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}

export default Listing;
