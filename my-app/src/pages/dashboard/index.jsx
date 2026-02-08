// pages/dashboard/index.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Filters from "@/Component/dashboard/Filter.jsx";
import EventTable from "@/Component/dashboard/eventTable.jsx";
import EventPreview from "@/Component/dashboard/eventPreview.jsx";
import NavBar from "@/Component/NavBar/index.jsx";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    city: "Sydney",
    keyword: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // 📦 FETCH DASHBOARD EVENTS (requires token)
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    const query = new URLSearchParams(filters).toString();

    fetch(`http://localhost:5000/dashboard-events?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setEvents(data.events || []))
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, [filters, isAuthenticated]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <aside className={styles.sidebar}>
          <h1>Event Dashboard</h1>
          <Filters filters={filters} onChange={setFilters} />
        </aside>

        <main className={styles.main}>
          <div className={styles.tableContainer}>
            <h2>Events</h2>
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <EventTable
                events={events}
                onSelect={setSelectedEvent}
                selectedId={selectedEvent?._id}
              />
            )}
          </div>

          <div className={styles.previewContainer}>
            <h2>Preview</h2>
            <EventPreview event={selectedEvent} />
          </div>
        </main>
      </div>
    </>
  );
}
