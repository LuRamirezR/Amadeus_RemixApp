import { useLocation, useNavigate } from "@remix-run/react";
import { submitAnswers } from "~/services/answerService";
import {
  getIdCities,
  getCity,
  getCombinationHash,
} from "~/services/cityService";
import { AnswerInterface } from "~/interfaces/answer";
import { CityInterface } from "~/interfaces/city";
import { DestinationInterface } from "~/interfaces/destination";
import SocialMedia from "~/components/social-media/social-media";
import { useEffect, useState } from "react";

import "./styles/overview.css";

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
  const [userId, setUserId] = useState("defaultUserId");
  const [dataCity, setDataCity] = useState<CityInterface[]>([]);
  const [isDataCityUpdated, setIsDataCityUpdated] = useState(false);

  // Obtiene el userId del localStorage si está disponible y lo establece en el estado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
    console.log("Updated dataCity:", dataCity);
  }, [dataCity]);

  // Navega a la página de resultados pasando dataCity en el estado de la navegación
  useEffect(() => {
    if (isDataCityUpdated) {
      console.log("Final dataCity:", dataCity);
      navigate("/results", { state: { dataCity: [...dataCity] } });
    }
  }, [isDataCityUpdated, dataCity, navigate]);

  const fetchCityData = async (hash: string) => {
    try {
      const result: DestinationInterface = await getIdCities(hash);
      console.log("API result:", result); // Verificar la respuesta de la API
      const { firstCityId, secondCityId } = result;
      if (firstCityId && secondCityId) {
        const cityData: CityInterface[] = [];
        cityData.push(await getCity(firstCityId));
        cityData.push(await getCity(secondCityId));
        setDataCity(cityData);
        setIsDataCityUpdated(true);
      } else {
        console.error("City IDs are undefined:", result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Genera un hash de combinación a partir de las respuestas del usuario y llama a getCombinationHash
  const getHash = async (answers: AnswerInterface[]) => {
    let combinationAnswer: string = "";
    for (const answerUser of answers) {
      combinationAnswer += answerUser.questionOptionId;
    }
    console.log(`Generated combination answer: ${combinationAnswer}`);
    try {
      const combinationHash = await getCombinationHash(combinationAnswer);
      console.log(`Received combination hash: ${combinationHash}`);
      await fetchCityData(combinationHash);
    } catch (error) {
      console.error(error);
    }
  };

  // // Regresar a Cards manteniendo las selecciones
  const handleBack = () => {
    console.log("Navigating back to /cards with responses:", responses);
    navigate("/cards", { state: { responses } });
  };

  // Envía las respuestas del usuario al backend y obtiene los datos de las ciudades
  const handleSubmit = async () => {
    const answers = responses.map((response) => ({
      userId: parseInt(userId),
      questionId: parseInt(response.questionId),
      questionOptionId: parseInt(response.selectedOptionId),
      createdAt: new Date().toISOString(),
    }));

    await getHash(answers);
    await submitAnswers(answers);
  };

  //1.Si el usuario hace clic en "Continuar", se llama a handleSubmit, que llama a getHash, que llama a combination, que llama a getIdCities, que llama a getCity.
  //2. getCity obtiene los datos de la ciudad y actualiza el estado dataCity.
  //3. El useEffect para dataCity y isDataCityUpdated se ejecuta y navega a la página /results con los datos de la ciudad
  return (
    <section className="overview">
      <div className="overview-heading">
        <h1>🔎 Revisa tus elecciones</h1>
      </div>
      <div className="overview-container">
        <p className="overview-text">
          ¿Quieres hacer ajustes o seguimos a tu destino de viaje?
        </p>
        <ul className="overview-list">
          {responses.map((response: ResponseUser, index: number) => (
            <li key={index}>
              <strong>{questionLabels[index]}:</strong>{" "}
              {response.selectedOption}
            </li>
          ))}
        </ul>
        <div className="overview-btns">
          <button onClick={handleBack} className="overview-btn back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#26005a"
                d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
              />
            </svg>
            Regresar
          </button>
          <button onClick={handleSubmit} className="overview-btn next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#f8eeff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 12l5 5L20 7"
              />
            </svg>
            Continuar
          </button>
        </div>
      </div>

      <SocialMedia backgroundColor="#26005a" iconColor="#f8eeff" />
    </section>
  );
}
