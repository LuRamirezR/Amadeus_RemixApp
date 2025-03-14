import "./card-button.css";

type CardButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const CardButton = ({ onClick, children }: CardButtonProps) => {
  return (
    <div>
      <button className="card-button" onClick={onClick}>
        {children === "Anterior" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        )}
        {children}
        {children === "Siguiente" && (
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
        )}
      </button>
    </div>
  );
};
