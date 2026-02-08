import Link from "next/link";
import styles from "@/styles/home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Listing Platform</h1>

      <p className={styles.text}>
        Discover events happening around you.  
        Login or create an account to access the dashboard.
      </p>

      <div className={styles.buttonGroup}>
        <Link href="/login">
          <button className={`${styles.btn} ${styles.loginBtn}`}>
  Login
</button>

        </Link>

        <Link href="/register">
          <button className={`${styles.registerBtn} ${styles.btn}`}>Register</button>
        </Link>
      </div>
    </div>
  );
}


