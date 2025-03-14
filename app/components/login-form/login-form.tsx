import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import "./login-form.css";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  // Determina que el correo sea valido
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Determina si el botón debe estar habilitado
  const isFormValid = name.trim() != "" && isValidEmail(email) && accepted;

  return (
    <Form method="post" className="login-form">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="login-input"
      />
      <input
        type="text"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
      />
      <label htmlFor="accept-terms">
        <input
          type="checkbox"
          id="accept-terms"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        Acepto los términos y condiciones
      </label>
      <Link to="/">
        <button type="submit" disabled={!isFormValid} className="login-button">
          Tu próximo viaje
        </button>
      </Link>
    </Form>
  );
}
