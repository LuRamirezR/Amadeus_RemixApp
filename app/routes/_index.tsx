import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import "./styles/index.css";
// import "../routes/styles/global.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Amadeus App" },
    { name: "Travel Amadeus App", content: "Welcome to Amadeus App!" },
  ];
};

export default function Index() {
  return (
    <section className="home">
      <div className="home-content">
        <article className="home-socialmedia">
          <a
            href="https://www.facebook.com/AmadeusITGroup/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#545454"
                d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/amadeusitgroup"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#545454"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="#545454"
              >
                <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
              </g>
            </svg>
          </a>
          <a
            href="https://twitter.com/AmadeusITGroup"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="#545454" strokeWidth="1.5">
                <path d="M16.82 20.768L3.753 3.968A.6.6 0 0 1 4.227 3h2.48a.6.6 0 0 1 .473.232l13.067 16.8a.6.6 0 0 1-.474.968h-2.48a.6.6 0 0 1-.473-.232Z" />
                <path strokeLinecap="round" d="M20 3L4 21" />
              </g>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/amadeus"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="#545454"
                d="M3.44 4.89c.8 0 1.44-.65 1.44-1.44s-.65-1.44-1.44-1.44S2 2.66 2 3.45s.65 1.44 1.44 1.44m2.81 1.09V14h2.48v-3.96c0-1.05.2-2.06 1.49-2.06s1.29 1.2 1.29 2.12V14H14V9.6c0-2.16-.46-3.82-2.98-3.82c-1.21 0-2.02.66-2.35 1.29h-.03v-1.1H6.26Zm-4.05 0h2.49V14H2.2z"
              />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/user/AmadeusITGroup"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#545454"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M2.5 17a24.1 24.1 0 0 1 0-10a2 2 0 0 1 1.4-1.4a49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10a2 2 0 0 1-1.4 1.4a49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15l5-3l-5-3z" />
              </g>
            </svg>
          </a>
        </article>
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
      </div>
    </section>
  );
}
