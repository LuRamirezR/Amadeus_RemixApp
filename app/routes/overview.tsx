import { useLocation, useNavigate } from "@remix-run/react";
import { submitAnswers } from "../services/answerService";
import { AnswerInterface } from "../interfaces/answer";

type ResponseUser = {
  questionId: string;
  question: string;
  selectedOptionId: string;
  selectedOption: string;
};

const questionLabels = [
  "Preferencia del destino",
  "Preferencia de clima",
  "Preferencia de actividad",
  "Preferencia de alojamiento",
  "Duración del viaje",
  "Tu edad",
];

export default function Overview() {
  const location = useLocation();
  const navigate = useNavigate();
  const responses: ResponseUser[] = location.state?.responses || [];
  const userId = localStorage.getItem("userId") || "defaultUserId";

  // Regresar a Cards manteniendo las selecciones
  const handleBack = () => {
    navigate("/cards", { state: { responses } });
  };

  // Enviar datos al backend
  const handleSubmit = async () => {
    const answers: AnswerInterface[] = responses.map((response) => ({
      user_id: userId,
      question_id: response.questionId,
      question_option_id: response.selectedOptionId,
      date: new Date().toISOString(),
    }));

    await submitAnswers(answers);
    navigate("/results"); // Ir a results después de enviar datos
  };

  return (
    <div>
      <h1>
        <span>🔎 Revisa tus elecciones</span>
        <span>¿Quieres hacer ajustes o seguimos a tu destino de viaje?</span>
      </h1>
      <ul>
        {responses.map((response: ResponseUser, index: number) => (
          <li key={index}>
            <strong>{questionLabels[index]}:</strong> {response.selectedOption}
          </li>
        ))}
      </ul>
      <button onClick={handleBack}>🔙 Regresar</button>
      <button onClick={handleSubmit}>✅ Continuar</button>
    </div>
  );
}
