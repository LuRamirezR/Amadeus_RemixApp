import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { CardQuestion } from "~/components/card-question/card-question";
import { CardButton } from "~/components/card-button/card-button";
import { useEffect, useState } from "react";
import "./styles/cards.css";

// Instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Se ejecuta en el servidor antes de que el componente se renderice.
// Función para cargar los datos iniciales de la página
export const loader = async () => {
  const questions = await prisma.question.findMany({
    include: {
      question_options: true,
    },
  });

  return json({ questions });
};

export default function Cards() {
  const { questions } = useLoaderData<typeof loader>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number | null>>({});
  const [isFinished, setIsFinished] = useState(false); // Estado para detectar finalización
  const navigate = useNavigate(); // Hook para navegación manual

  const currentQuestion = questions[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    console.log("Respuestas seleccionadas:", responses);
    // Aquí podrías enviar las respuestas al backend con fetch o un action de Remix
    setIsFinished(true); // Activamos el estado para disparar el useEffect
  };

  useEffect(() => {
    if (isFinished) {
      // Aquí podrías hacer una petición al backend
      setTimeout(() => {
        navigate("/"); // Redirigir después de un pequeño retraso
      }, 500); // 500ms para dar tiempo a ejecutar el console.log o una petición real
    }
  }, [isFinished, navigate]);

  const handleOptionChange = (questionId: number, optionId: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: optionId }));
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
