import { NavLink } from "@remix-run/react";
import "./navbar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="/images/amadeus-logo-dark-sky.png"
            alt="Amadeus logo"
            className="logo"
          />
        </div>
        <nav className="navbar-nav">
          <NavLink to="/" className="navbar-link">
            Inicio
          </NavLink>
          <a
            href="https://amadeus.com/es/quienes-somos/overview"
            target="_blank"
            rel="noreferrer"
            className="navbar-link"
          >
            Sobre nosotros
          </a>
          <a
            href="https://amadeus.com/es/contacto"
            target="_blank"
            rel="noreferrer"
            className="navbar-link"
          >
            Contacto
          </a>
          <NavLink to="/formless" className="navbar-link">
            Reportes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
