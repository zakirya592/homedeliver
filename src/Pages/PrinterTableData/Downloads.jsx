import React from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

const options = {
  filename: "advanced-example.pdf",
  method: "save",
  resolution: Resolution.EXTREME,
  page: {
    margin: Margin.NONE,
    format: "letter",
    orientation: "landscape",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
};

const getTargetElement = () => document.getElementById("container");

const downloadPdf = () =>
{
  const container = document.getElementById("container");
  // Set background image and its properties
  container.style.backgroundImage =
    "url('https://i.ibb.co/pvNXhDC/Printer.png')";
  container.style.backgroundSize = "cover";
  container.style.backgroundRepeat = "no-repeat";
  // Generate PDF
  generatePDF(getTargetElement, options);
  // Reset background image after generating PDF
  container.style.backgroundImage = "none";
};



const Downloads = () =>
{
  return (
    <div>
      <button onClick={downloadPdf}>Download PDF</button>
      <div id="container">
        <div className="mt-5">
          <div style={{ margintop: "15% important", marginLeft: "12% !important", fontSize: "16px", fontWeight: "bold", color: "#140d0d" }}>kasjfhdjksfh</div>
          <div style={{ margintop: "15% important", marginright: "13% !important", fontSize: "16px", fontWeight: "bold", color: "red" }}>Date</div>
        </div>


      </div>
    </div>
  );
};

export default Downloads;
