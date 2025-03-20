import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "react-router-dom";
import "./styles/results.css";

export const meta: MetaFunction = () => {
    return [{ title: "Results - Explore Your Destination" }];
};

export default function Results() {
    const navigate = useNavigate();

    const destinations = [
        {
            city: "Cartagena, Colombia",
            image: "../images/colombia.jpg",
            description: "Sumérgete en la magia de Cartagena... ",
            slug: "cartagena",
        },
        {
            city: "París, Francia",
            image: "../images/francia.jpg",
            description: "Descubre París, el epicentro del romance...",
            slug: "paris",
        },
    ];

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
                {/* Cambio clave en el padding responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-0 md:px-6 py-12 max-w-6xl mx-auto">
                    {destinations.map((dest, index) => (
                        <div key={index} className="destination-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2">
                            <img src={dest.image} alt={dest.city} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{dest.city}</h2>
                                <p className="mt-3 text-gray-600">{dest.description}</p>
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