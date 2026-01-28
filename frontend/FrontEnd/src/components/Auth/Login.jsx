import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/useAuth"; // adjust path if needed

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from = location.state?.from?.pathname; // where user tried to go before login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        credentials: "include", // ✅ keep; harmless for JWT, required for cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setError(data?.message || "Invalid credentials");
        return;
      }

      // ✅ Update AuthContext + localStorage (depending on how you updated AuthProvider)
      // Expecting: data.user and optional data.token
      login({ user: data.user, token: data.token });

      // ✅ Debug once (remove later)
      // console.log("LOGIN DATA:", data);

      // ✅ Redirect logic
      // 1) If user was blocked by ProtectedRoute, go back there
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // 2) Otherwise redirect based on role
      const role = data?.user?.role;

      // If your backend uses different values (e.g., "Admin"), normalize:
      const normalizedRole = typeof role === "string" ? role.toLowerCase() : "";

      if (normalizedRole === "admin") navigate("/admin", { replace: true });
      else if (normalizedRole === "teacher") navigate("/teacher", { replace: true });
      else if (normalizedRole === "parent") navigate("/parent", { replace: true });
      else {
        // fallback if role missing
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
