import "./card-button.css";

type CardButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const CardButton = ({ onClick, children }: CardButtonProps) => {
  return (
    <div>
      <button className="card-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
