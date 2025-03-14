import { question, question_options } from "@prisma/client";
import "./card-question.css";

type CardQuestionProps = {
  question: question & { question_options: question_options[] };
  onOptionChange: (questionId: number, optionId: number) => void;
  selectedOption: number | null;
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
        {question.question_options.map((option) => (
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
            <label htmlFor={`option-${option.id}`}>
              <img
                src="https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
