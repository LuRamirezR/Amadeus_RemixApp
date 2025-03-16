import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
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
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    console.log("Respuestas seleccionadas:", responses);
    // Aquí podrías enviar las respuestas al backend con fetch o un action de Remix
    setIsFinished(true);
  };

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        navigate("/overview");
      }, 500);
    }
  }, [isFinished, navigate]);

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
        <span>El viaje ideal te está esperando ✈️💫</span>
        <span>Cuéntanos un poco sobre ti y te diremos a dónde ir</span>
      </h1>
      <div className="cards-content">
        <CardQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          onOptionChange={handleOptionChange}
          selectedOption={responses[currentQuestion.id] || null}
        />
        <div className="cards-buttons">
          <CardButton onClick={handlePrevious}>Anterior</CardButton>
          {currentIndex < questions.length - 1 ? (
            <CardButton onClick={handleNext}>Siguiente</CardButton>
          ) : (
            <CardButton onClick={handleFinish}>
              Conoce tu destino de viaje
            </CardButton>
          )}
        </div>
      </div>
    </div>
  );
}
