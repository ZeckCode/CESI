// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") navigate("/admin");
    if (role === "teacher") navigate("/teacher");
  };

  return (
    <div>
      <h2>Login</h2>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
