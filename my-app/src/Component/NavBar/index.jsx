import React from "react";
import styles from "./styles.module.css";

function NavBar({ title = "Event Dashboard" }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>EventInSydney</div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="/dashboard">Dashboard</a></li>
          <li className={styles.navItem}><a href="/listing-page">Events</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
