const OPTIONS_API = "http://localhost:5174/api/QuestionOption";

//Metodo GET a la tabla question_options - conexion al BackEnd (API)
export async function getQuestionOptions() {
  try {
    const optionsResponse = await fetch(OPTIONS_API);
    if (!optionsResponse.ok) {
      throw new Error("Error en la peticion de opciones");
    }
    return await optionsResponse.json();
  } catch (error) {
    console.error("Error en la peticion de opciones", error);
    return [];
  }
}
