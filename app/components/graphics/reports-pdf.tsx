import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ExportPDF = () => {
  const generatePDF = () => {
    const container = document.getElementById("container_graphics");

    if (container !== null) {
      html2canvas(container).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("reporte.pdf");
      });
    };
  }

  return (
    <div>
      <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">
        Descargar PDF
      </button>
    </div>
  );
};

export default ExportPDF;
