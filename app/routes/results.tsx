import { MetaFunction } from "@remix-run/node";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/results.css";
import { CityInterface } from "~/interfaces/city";

export const meta: MetaFunction = () => {
  return [{ title: "Results - Explore Your Destination" }];
};

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataCity: CityInterface[] = location.state?.dataCity || [];

  console.log("Results data: ");
  console.log(dataCity);

  return (
    <section className="results overflow-visible flex flex-col min-h-screen">
      <div className="hero">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Tu destino te espera
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Basándonos en tus preferencias, hemos seleccionado dos destinos...
        </p>
      </div>

      <div className="destinations-container flex-grow">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-0 md:px-6 py-12 max-w-6xl mx-auto">
          {dataCity.map((city, index) => (
            <div
              key={index}
              className="destination-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2"
            >
              <img
                src={city.img_city}
                alt={city.description}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {city.description}
                </h2>
                <p className="mt-3 text-gray-600">{city.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => navigate(`/airlines`)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                    Ver vuelos y hospedajes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
