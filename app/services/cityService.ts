import { CityInterface } from "../interfaces/city";
import { DestinationInterface } from "../interfaces/destination";

const API_BASE_URL = "http://localhost:5174/api";

export const getIdCities = async (
  hash: string
): Promise<DestinationInterface> => {
  console.log(`Fetching city IDs with hash: ${hash}`);
  const response = await fetch(
    `${API_BASE_URL}/destination/combination/${hash}`
  );
  if (!response.ok) {
    throw new Error("Error fetching city IDs");
  }
  return response.json();
};

export const getCity = async (cityId: number): Promise<CityInterface> => {
  console.log(`Fetching city data for city ID: ${cityId}`);
  const response = await fetch(`${API_BASE_URL}/city/${cityId}`);
  if (!response.ok) {
    throw new Error("Error fetching city data");
  }
  return response.json();
};

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
