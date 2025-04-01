import { CityInterface } from "../interfaces/city";
import { DestinationInterface } from "../interfaces/destination";

const API_BASE_URL = "http://localhost:5174/api";

// Ciudades por defecto quemadas en el código
const DEFAULT_CITIES: Record<number, CityInterface> = {
  39: {
    id: 39,
    description: "Bora Bora, Polinesia Francesa",
    img_city: "/borabora.jpg",
  },
  40: {
    id: 40,
    description: "Dubái, Emiratos Árabes",
    img_city: "/dubai.jpg",
  },
};

const DEFAULT_DESTINATION: DestinationInterface = {
  combination: "default_combination",
  firstCityId: 39, // ID de Bobora
  secondCityId: 40, // ID de Dubái
};

// Obtiene los IDs de las ciudades a partir del hash
export const getIdCities = async (
  hash: string
): Promise<DestinationInterface> => {
  console.log(`Fetching city IDs with hash: ${hash}`);
  const response = await fetch(
    `${API_BASE_URL}/destination/combination/${hash}`
  );
  if (response.status === 404) {
    console.warn("City IDs not found, returning default cities.");
    return DEFAULT_DESTINATION; // Retorna ciudades por defecto si no se encuentran
  }
  if (!response.ok) {
    throw new Error("Error fetching city IDs");
  }
  return response.json();
};

// Obtiene los datos de las ciudades a partir de sus IDs
export const getCity = async (cityId: number): Promise<CityInterface> => {
  console.log(`Fetching city data for city ID: ${cityId}`);
  if (DEFAULT_CITIES[cityId]) {
    console.log(`Returning default city data for city ID: ${cityId}`);
    return DEFAULT_CITIES[cityId]; // Retorna los datos quemados si es una ciudad por defecto
  }
  const response = await fetch(`${API_BASE_URL}/city/${cityId}`);
  if (!response.ok) {
    throw new Error("Error fetching city data");
  }
  return response.json();
};

// Obtiene el hash de combinación y llama a getIdCities
export const getCombinationHash = async (
  combinationHash: string
): Promise<string> => {
  console.log(`Fetching combination hash: ${combinationHash}`);
  const response = await fetch(
    `${API_BASE_URL}/destination/${combinationHash}`
  );
  if (!response.ok) {
    throw new Error("Error fetching combination hash");
  }
  return response.text();
};
