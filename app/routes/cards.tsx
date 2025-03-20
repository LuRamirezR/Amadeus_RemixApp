import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { CardQuestion } from "~/components/card-question/card-question";
import { CardButton } from "~/components/card-button/card-button";
import "./styles/cards.css";

// URLs de MockAPI
const QUESTIONS_API =
  "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/questions";
const OPTIONS_API =
  "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/question_options";

//Define los tipos de datos
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

//Define el tipo de respuesta del loader
interface LoaderData {
  questions: Question[];
}

//Función loader para obtener datos desde BackEnd (MockAPI)
export const loader = async (): Promise<Response> => {
  //obtiene la respuesta de la API de preguntas y opciones
  const [questionResponse, optionsResponse] = await Promise.all([
    fetch(QUESTIONS_API),
    fetch(OPTIONS_API),
  ]);

  //Convierte las respuestas a JSON
  const questions: Question[] = await questionResponse.json();
  const options: Option[] = await optionsResponse.json();

  //Asociar las opciones con sus preguntas
  const questionsWithOptions: Question[] = questions.map((question) => {
    return {
      id: question.id,
      question_text: question.question_text,
      question_options: options.filter(
        (option) => option.question_id === question.id
      ),
    };
  });

  return json<LoaderData>({ questions: questionsWithOptions });
};

export default function Cards() {
  const { questions } = useLoaderData<typeof loader>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | null>>({});
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!responses[currentQuestion.id]) {
      alert("Por favor, selecciona una opción antes de continuar.");
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    const selectedResponses = questions.map((question: Question) => ({
      question: question.question_text,
      selectedOption:
        question.question_options?.find(
          (option: Option) => option.id === responses[question.id]
        )?.description || "No seleccionado",
    }));
    navigate("/overview", { state: { responses: selectedResponses } });
  };

  const handleOptionChange = (questionId: string, optionId: string) => {
    setResponses((prev) => {
      const newResponses = Object.assign({}, prev); // Copia el estado actual
      newResponses[questionId] = optionId; // Actualiza el valor específico
      return newResponses; // Retorna el nuevo estado
    });
  };

  return (
    <div className="cards-container">
      <h1 className="cards-heading">
        <span className="cards-heading-first">
          El viaje ideal te está esperando ✈️💫
        </span>
        <span className="cards-heading-second">
          Cuéntanos un poco sobre ti y te diremos a dónde ir
        </span>
      </h1>
      <div className="cards-buttoncontent">
        <div className="prev-button-container">
          {currentIndex > 0 && (
            <CardButton onClick={handlePrevious}>
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
            </CardButton>
          )}
        </div>

        <div className="cards-content">
          <CardQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            onOptionChange={handleOptionChange}
            selectedOption={responses[currentQuestion.id] || null}
          />
        </div>

        <div className="next-button-container">
          {currentIndex < questions.length - 1 ? (
            <CardButton onClick={handleNext}>
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
            </CardButton>
          ) : (
            <CardButton onClick={handleFinish}>Vamos!</CardButton>
          )}
        </div>
      </div>
    </div>
  );
}
