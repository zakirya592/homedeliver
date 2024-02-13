import React from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import jsPDF from "jspdf";

const handlePrintTable2 = tableSelectedRows =>
{
  const doc = new jsPDF();
  const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';
  const logsss = 'https://i.ibb.co/bPNS38G/Printer.png';
  // const imageshowss = https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(tableSelectedRows[0].cardno)}&size=80x80;
  const imageshowss = 0
  const loadImage1 = new Promise(resolve =>
  {
    const img1 = new Image();
    img1.crossOrigin = "Anonymous";
    img1.src = logsss;
    img1.onload = () =>
    {
      resolve(img1);
    };
  });

  const loadImage2 = new Promise(resolve =>
  {
    if (imageshowss) {
      const img2 = new Image();
      img2.crossOrigin = "Anonymous";
      img2.src = imageshowss;
      img2.onload = () =>
      {
        resolve(img2);
      };
    } else {
      resolve(null);
    }
  });

  Promise.all([loadImage1, loadImage2]).then(([img1, img2]) =>
  {
    const tableHtml = `
            <div style="background: 'red'; background-size: cover; background-position: center; height: 100vh;">
                <p style='position: absolute;
                    top: 15%;
                    left: 9%;
                    font-size: 10px;
                    color: #140d0d;'>
                   1245
                </p>
                <p style='position: absolute;
                  
                    font-size: 16px;
                    font-weight: bold;
                    color: #140d0d;'>
                    comment
                </p>
                <p style='position: absolute;
                    top: 80%;
                    left: 80%;
                    font-size: 16px;
                    font-weight: bold;
                    color: #140d0d;'>
                </p>
            </div>
        `;

    const printContent = `
            <html>
                <head>
                    <title>DataGrid Table</title>
                    <style>
                        @media print {
                            body {
                                padding: 0;
                                margin: 0;
                            }
                            th {
                                ${headerStyle}
                            }
                        }
                    </style>
                </head>
                <body>${tableHtml}</body>
            </html>
        `;

    doc.html(printContent, {
      callback: () =>
      {
        doc.save('table.pdf');
      }
    });
  });
};



const Downloads = () =>
{
  return (
    <div>
      <button onClick={handlePrintTable2}>Download PDF</button>
      <div id="container">
        <div className="mt-5">
          <div
            style={{
              margintop: "15% important",
              marginLeft: "12% !important",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#140d0d",
            }}
          >
            kasjfhdjksfh
          </div>
          <div
            style={{
              margintop: "15% important",
              marginright: "13% !important",
              fontSize: "16px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Date
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;