import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { futuristicTheme } from "../theme/futuristic";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.access_token);
      navigate("/dashboard");
    } catch (e) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form className={`${futuristicTheme.card} w-full max-w-md`} onSubmit={handleLogin}>
        <h2 className={`${futuristicTheme.title} mb-6`}>Iniciar Sesión</h2>
        <input
          className={`${futuristicTheme.input} w-full mb-4`}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className={`${futuristicTheme.input} w-full mb-6`}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={`${futuristicTheme.button} w-full`}>Entrar</button>
        {error && <div className="mt-3 text-red-400">{error}</div>}
      </form>
    </div>
  );
}