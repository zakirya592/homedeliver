import React from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import jsPDF from "jspdf";

const handlePrintTable2 = (tableSelectedRows) =>
{
  const doc = new jsPDF();
  const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';
  const logsss = 'https://i.ibb.co/bPNS38G/Printer.png';
  const imageshowss = 0;

  const loadImage1 = new Promise((resolve) =>
  {
    const img1 = new Image();
    img1.crossOrigin = 'Anonymous';
    img1.src = logsss;
    img1.onload = () =>
    {
      resolve(img1);
    };
  });

  const loadImage2 = new Promise((resolve) =>
  {
    if (imageshowss) {
      const img2 = new Image();
      img2.crossOrigin = 'Anonymous';
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
    doc.addImage(img1, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const tableHtml = `
      <div>
        <p style='position: absolute;
          top: 15%;
          left: 9%;
          font-size: 10px;
          color: #140d0d;'>
          111111111111111
        </p>
        <p style='position: absolute;
          font-size: 16px;
          font-weight: bold;
          color: red'>
          2222222222222222222222 comment
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
      },
    });
  });
};


const Downloads = () =>
{
  return (
    <div>
      <button onClick={handlePrintTable2}>Download PDF</button>

    </div>
  );
};

export default Downloads;