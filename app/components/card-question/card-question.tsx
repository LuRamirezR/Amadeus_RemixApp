import "./card-question.css";

// Reutilizo los tipos definidos en Cards.tsx
interface Option {
  id: string;
  question_id: string;
  description: string;
  img_description: string;
}

interface Question {
  id: string;
  question_text: string;
  question_options?: Option[];
}

type CardQuestionProps = {
  question: Question;
  onOptionChange: (questionId: string, optionId: string) => void;
  selectedOption: string | null;
};

export const CardQuestion = ({
  question,
  onOptionChange,
  selectedOption,
}: CardQuestionProps) => {
  return (
    <div className="question-container">
      <h2 className="question-content">{question.question_text}</h2>
      <div className="options">
        {question.question_options?.map((option) => (
          <div
            key={option.id}
            className={`option-content ${
              selectedOption === option.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              id={`option-${option.id}`}
              name={`question-${question.id}`}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => onOptionChange(question.id, option.id)}
            />
            <label htmlFor={`option-${option.id}`} className="option-label">
              <img
                src={option.img_description}
                alt={option.description}
                className="option-image"
              />
              {option.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
