"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert("Registered successfully");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Create Account</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.registerBtn}>
          Register
        </button>

        <p className={styles.footerText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
