import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import ExportPDF from "~/components/graphics/reports-pdf";
import Graphics from "../components/graphics/graphics"; 

export default function Reportes() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("⛔ No hay token, redirigiendo a /admin");
      navigate("/admin"); 
      return;
    }

    fetch("http://localhost:5174/api/answer/details", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("⛔ No autorizado");
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        navigate("/admin"); 
      });
  }, [navigate]);

  if (!data) return <p>⏳ Cargando datos...</p>;
  return (
    <>
      <div id="container_graphics">
        <Graphics data={data} /> 
        <div id="pdf-section">
          <ExportPDF />
        </div>
      </div>
    </>
  );
  
}
