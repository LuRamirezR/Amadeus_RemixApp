import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import "./styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <section className="home">
      <div className="home-content">
        <article className="home-text">
          <h1 className="home-heading">
            <span className="home-block">El viaje perfecto está a</span>
            <span className="home-highlight">un clic de distancia</span>
          </h1>
          <p className="home-description">
            Olvídate de perder horas buscando destinos. Personaliza tu próxima
            aventura según tus gustos y disfruta sin complicaciones.
          </p>
          <div className="home-buttons">
            <Link to="login" className="home-btn-primary">
              Explora ahora...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a
              href="https://amadeus.com/es"
              target="_blank"
              rel="noreferrer"
              className="home-btn-secondary"
            >
              Conoce más
            </a>
          </div>
        </article>
        <article className="home-image">
          <img
            src="/images/paisaje_home.jpg"
            alt="Imagen de ciudad con botes"
          />
        </article>
      </div>
    </section>
  );
}
