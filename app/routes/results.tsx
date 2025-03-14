import { MetaFunction } from "@remix-run/node";
import "./styles/results.css";

export const meta: MetaFunction = () => {
    return [{ title: "Results - Explore Your Destination" }];
};

export default function Results() {
    const destinations = [
        {
            country:  "Cartagena, Colombia.",
            image: "../images/colombia.jpg",
            description: "Sumérgete en la magia de Cartagena..."
        },
        {
            country: "París, Francia.",
            image: "../images/francia.jpg",
            description: "Descubre París, el epicentro del romance..."
        },
    ];

    return (
        <section className="results overflow-visible">
            {/* Sección título */}
            <div className="hero">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Tu destino te espera
                </h1>
                <p className="text-center text-gray-600 text-lg">
                    Basándonos en tus preferencias, hemos seleccionado dos destinos...
                </p>
            </div>

            {/* Sección de destinos */}
            <div className="destinations-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-12 max-w-6xl mx-auto">
                    {destinations.map((dest, index) => (
                        <div key={index} className="destination-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2">
                            <img src={dest.image} alt={dest.country} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{dest.country}</h2>
                                <p className="mt-3 text-gray-600">{dest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}