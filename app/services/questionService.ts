const QUESTIONS_API = "http://localhost:5174/api/question";

//Metodo GET a la tabla questions - conexion al BackEnd (API)
export async function getQuestions() {
  try {
    const questionResponse = await fetch(QUESTIONS_API);
    if (!questionResponse.ok) {
      throw new Error("Error en la peticion de preguntas");
    }
    return await questionResponse.json();
  } catch (error) {
    console.error("Error en la peticion de preguntas", error);
    return [];
  }
}
