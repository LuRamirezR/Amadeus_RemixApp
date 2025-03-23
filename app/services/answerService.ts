import { AnswerInterface } from "../interfaces/answer";

// Metodo POST para enviar respuestas desde Overview
export async function submitAnswers(answers: AnswerInterface[]) {
  try {
    const response = await fetch(
      "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/answer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers), // Enviar directamente el array de respuestas
      }
    );

    if (!response.ok) {
      console.error("Error al enviar respuestas");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
