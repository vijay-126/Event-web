import Link from "next/link";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Discover Events Around You 🎉
      </h1>

      <p className={styles.text}>
        Find concerts, workshops, meetups, and experiences happening near you.
        Sign in to manage events or explore what’s trending right now.
      </p>

      <div className={styles.buttonGroup}>
        {/* 🔎 Public listing */}
        <Link href="/listing-page">
          <button className={`${styles.btn} ${styles.exploreBtn}`}>
            Browse Events
          </button>
        </Link>

        {/* 🔐 Auth */}
        <Link href="/login">
          <button className={`${styles.btn} ${styles.loginBtn}`}>
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className={`${styles.btn} ${styles.registerBtn}`}>
            Create Account
          </button>
        </Link>
      </div>

      <p className={styles.subText}>
        No sign-up required to explore events 🚀
      </p>
    </div>
  );
}
