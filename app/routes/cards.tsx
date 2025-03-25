import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { CardButton } from "~/components/card-button/card-button";
import { CardQuestion } from "~/components/card-question/card-question";
import { QuestionInterface } from "~/interfaces/question";
import { OptionInterface } from "~/interfaces/option";
import { getQuestions } from "~/services/questionService";
import { getQuestionOptions } from "~/services/questionOptionsService";
import SocialMedia from "~/components/social-media/social-media";

import "./styles/cards.css";

//Define el tipo de respuesta del loader
interface LoaderData {
  questionsLoaded: QuestionInterface[];
}

//Funcion para obtener las preguntas y opciones
export const loader = async (): Promise<Response> => {
  const responseQuestion: QuestionInterface[] = await getQuestions();
  const responseQuestionOptions: OptionInterface[] = await getQuestionOptions();

  // Asociar las opciones con sus preguntas
  const questionsWithOptions: QuestionInterface[] = responseQuestion.map(
    (question) => {
      return {
        id: question.id,
        questionText: question.questionText,
        question_options: responseQuestionOptions.filter(
          (option) => option.questionId === question.id
        ),
      };
    }
  );
  return json<LoaderData>({ questionsLoaded: questionsWithOptions });
};

export default function Cards() {
  const { questionsLoaded } = useLoaderData<typeof loader>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | null>>({});
  const navigate = useNavigate();

  if (!questionsLoaded || questionsLoaded.length === 0) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questionsLoaded[currentIndex];

  //Funcion para actualizar el estado de las respuestas
  const handleOptionChange = (question_id: string, option_id: string) => {
    setResponses((prev) => {
      const newResponses = Object.assign({}, prev); // Copia el estado actual
      newResponses[question_id] = option_id; // Actualiza el valor específico de la respuesta
      return newResponses; // Devuelve el nuevo estado
    });
  };

  //Funciones de los botones
  //Función para ir a la pregunta anterior
  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  //Función para ir a la pregunta siguiente
  const handleNextClick = () => {
    if (!responses[currentQuestion.id]) {
      alert("Por favor selecciona una opción antes de continuar.");
      return;
    }
    if (currentIndex < questionsLoaded.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //Funcion para finalizar e ir a la vista overview
  const handleFinishClick = () => {
    const selectedResponses = questionsLoaded.map(
      (question: QuestionInterface) => ({
        questionId: question.id,
        question: question.questionText,
        selectedOptionId: responses[question.id] || "No seleccionado",
        selectedOption:
          question.question_options?.find(
            (option: OptionInterface) => option.id === responses[question.id]
          )?.description || "No seleccionado",
      })
    );
    navigate("/overview", { state: { responses: selectedResponses } });
  };

  return (
    <div className="cards">
      <h1 className="cards-heading">
        <span className="cards-heading-first">
          El viaje ideal te está esperando ✈️💫
        </span>
        <span className="cards-heading-second">
          Cuéntanos un poco sobre ti y te diremos a dónde ir
        </span>
      </h1>
      <div className="cards-container">
        <div className="cards-buttoncontent">
          <div className="prev-button-container">
            {currentIndex > 0 && (
              <CardButton onClick={handlePreviousClick}>
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
            {currentIndex < questionsLoaded.length - 1 ? (
              <CardButton onClick={handleNextClick}>
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
              <CardButton onClick={handleFinishClick}>Vamos!</CardButton>
            )}
          </div>
        </div>
      </div>
      <SocialMedia backgroundColor="#26005a" iconColor="#f8eeff" />
    </div>
  );
}
