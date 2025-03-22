import "./card-question.css";
import { QuestionInterface } from "~/interfaces/question";
// import { OptionInterface } from "~/interfaces/option"

type CardQuestionProps = {
  question: QuestionInterface;
  onOptionChange: (question_id: string, option_id: string) => void;
  selectedOption: string | null;
};

export const CardQuestion = ({
  question,
  onOptionChange,
  selectedOption,
}: CardQuestionProps) => {
  return (
    <div className="question-container">
      <h2 className="question-content">{question.questionText}</h2>
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
                src={option.imgDescription}
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
