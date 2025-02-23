"use client";

import type React from "react";

import { useState } from "react";
import { LoginView } from "./LoginView";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", email, password);
  };

  return (
    <LoginView email={email} setEmail={setEmail} password={password} setPassword={setPassword} onLogin={handleLogin} />
  );
}
