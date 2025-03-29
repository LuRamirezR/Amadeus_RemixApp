import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";
import SocialMedia from "~/components/social-media/social-media";
import "./styles/admin.css";

export default function AdminUsers() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isButtonDisabled = () => !(username && password);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
  
    try {
      const response = await fetch("http://localhost:5174/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, user_password: password }),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
  
      const data = await response.json(); // ⬅️ Obtenemos el token del backend
      console.log("🔹 Token recibido:", data.token);
  
      sessionStorage.setItem("token", data.token);
  
      console.log("✅ Login exitoso, redirigiendo...");
      navigate("/reports"); // 🔥 Ahora sí te redirige
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
      console.error("❌ Error en login:", error);
    }
  };
  
  return (
    <section className="admin-users">
      <div className="admin-users-header">
        <h1>Usuario Administrativo</h1>
      </div>
      <div className="admin-users-container">
        <Form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          <button
            type="submit"
            disabled={isButtonDisabled()}
            className="admin-submit-button"
          >
            Login
          </button>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <SocialMedia backgroundColor="#000835" iconColor="#0c66e1" />
    </section>
  );
}
