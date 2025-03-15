import ExportPDF from "~/components/reports/report";
import Grafica from "../components/reports/graphics";

export default function Reportes() {
  return (
    <>
      <Grafica />
      <ExportPDF />
    </>
  );
}
