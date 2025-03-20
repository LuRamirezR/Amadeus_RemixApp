import React from "react";
import { Link } from "react-router-dom";
import "./styles/airlines.css";

const Airlines: React.FC = () => {
    return (
        <div className="w-full overflow-auto">
            {/* Sección de Aerolíneas */}
            <div className="airlines-section bg-blue-50 py-12">
                <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8">
                    {/* Texto y estadísticas */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Encuentra la aerolínea perfecta para tu viaje
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Con más de 400 aerolíneas asociadas, te ofrecemos opciones para cada tipo de viajero. Ya sea que busques lujo, comodidad o tarifas económicas, tenemos la aerolínea ideal para ti.
                        </p>
                        {/* Botón modificado */}
                        <Link
                            to="/explore-airlines"
                            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-[#6610f2] rounded-lg shadow-md hover:bg-[#570dcf] transition-colors duration-300"
                        >
                            Explorar Aerolíneas
                        </Link>
                        {/* Estadísticas con colores actualizados */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center mt-8">
                            <div>
                                <h3 className="text-3xl font-bold text-[#6610f2]">400+</h3>
                                <p className="text-gray-600 mt-2">Aerolíneas</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-[#6610f2]">1.5B+</h3>
                                <p className="text-gray-600 mt-2">Pasajeros al año</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-[#6610f2]">50+</h3>
                                <p className="text-gray-600 mt-2">Aliados tech</p>
                            </div>
                        </div>
                    </div>
                    {/* Imagen avión */}
                    <div className="flex-1">
                        <img
                            src="/images/aerolinea.jpg"
                            alt="Avión despegando con cielo azul"
                            className="w-full h-auto md:h-80 rounded-lg shadow-lg object-cover max-w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Sección de Airbnb */}
            <div className="airbnb-section bg-gray-50 py-12">
                <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8">
                    {/* Imagen Airbnb */}
                    <div className="flex-1 order-2 md:order-1">
                        <img
                            src="/images/hotels.jpg"
                            alt="Alojamiento Airbnb"
                            className="w-full h-auto md:h-80 rounded-lg shadow-lg object-cover max-w-full"
                        />
                    </div>
                    {/* Texto Airbnb */}
                    <div className="flex-1 text-center md:text-left order-1 md:order-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Encuentra el alojamiento ideal.
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Explora una amplia variedad de alojamientos en todo el mundo. Desde acogedores apartamentos hasta lujosas villas, tenemos el lugar perfecto para tu estadía.
                        </p>
                        <Link
                            to="/explore-airbnb"
                            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-[#ff5a5f] rounded-lg shadow-md hover:bg-[#e0484d] transition-colors duration-300"
                        >
                            Explorar hoteles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Airlines;
