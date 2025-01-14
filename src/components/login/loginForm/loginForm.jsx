"use client";

import { authentication } from "@/lib/actions";
import { useState } from "react";
import styles from "./loginForm.module.css";

function LoginFormComponent() {
  const [error, setError] = useState(false);

  const handleLogin = async (formData) => {
    const data = await authentication(formData);
    data.error && setError(data.error);
  }

  return (
    <form action={handleLogin} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button>Login</button>
      {error && error}
    </form>
  );
}

export default LoginFormComponent;
