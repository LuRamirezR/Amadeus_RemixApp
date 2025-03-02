import { useState } from "react";
import "./avatar-selector.css";

const avatars = [
  "https://api.dicebear.com/9.x/personas/svg?seed=Liam",
  "https://api.dicebear.com/9.x/personas/svg?seed=Christopher",
  "https://api.dicebear.com/9.x/personas/svg?seed=Jude",
  "https://api.dicebear.com/9.x/personas/svg?seed=Aidan",
];

export default function AvatarSelector() {
  const [index, setIndex] = useState(0);

  const nextAvatar = () => {
    setIndex((prev) => (prev + 1) % avatars.length);
  };

  return (
    <div className="avatar-container">
      <img
        src={avatars[index]}
        alt="Avatar del viajero"
        className="avatar-image"
      />
      <button onClick={nextAvatar} className="avatar-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            className="avatar-arrow"
            d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
          />
        </svg>
      </button>
    </div>
  );
}
