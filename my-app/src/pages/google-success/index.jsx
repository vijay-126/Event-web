"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
  console.log("URL:", window.location.href);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  console.log("TOKEN FROM URL:", token);

  if (token) {
    localStorage.setItem("token", token);
    console.log("TOKEN SAVED:", localStorage.getItem("token"));
    router.replace("/listing-page");
  } else {
    console.log("NO TOKEN FOUND");
    router.replace("/login");
  }
}, []);


  return <p>Logging you in...</p>;
}


