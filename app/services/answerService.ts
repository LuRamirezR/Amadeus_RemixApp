import { AnswerInterface } from "../interfaces/answer";

// const ANSWER_API = "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/answer";
const ANSWER_API = "http://localhost:5174/api/answer";

// Metodo POST para enviar respuestas desde Overview
export async function submitAnswers(
  answers: AnswerInterface[]
): Promise<AnswerInterface[] | undefined> {
  try {
    const response = await fetch(ANSWER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    if (!response.ok) {
      throw new Error("Error al enviar respuestas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
