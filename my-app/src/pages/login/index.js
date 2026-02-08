"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  };

  const googleLogin = () => {
    window.location.href = `${backendUrl}/api/google`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <form onSubmit={login} className={styles.form}>
          <h2>Welcome Back</h2>

          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.loginBtn} type="submit">
            Login
          </button>

          <div className={styles.divider}>OR</div>

          <button
            type="button"
            onClick={googleLogin}
            className={styles.googleBtn}
          >
            Sign in with Google
          </button>
        </form>

        <div className={styles.bottomSection}>
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className={styles.createLink}
            >
              Create
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
