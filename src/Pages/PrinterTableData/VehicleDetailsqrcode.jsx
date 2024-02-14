import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactDOM from "react-dom";

const VehicleDetailsqrcode = () => {
  let { cardNo } = useParams();
  const [value, setvalue] = useState({
    image: '',
    CardNo: '', VehicalType: '', ModelYear: '',
    EngineHP: '', Origin: '', weight: '',
    chassisNo: '', importerorowner: '', color: '',
    Declaration: '', EngineNo: '', Comments: '',
    Datetime: '', Load: '', qrcode: "",
    Vehicledrive: '', EngineCapacity: '', PassengerCapacity: '',
    CarriageCapacity: '', VehicleBrandName: '', SpecificationStandardName: '',
    VCCGenerationDate: '', DeclarationDate: '', OwnerCode: '',
  })
  const getapi = () => {
    axios.get(`/get-mirsal/${cardNo}`)
      .then((res) => {
        setvalue((prevValue) => ({
          ...prevValue,
          CardNo: res.data.data.cardno || "",
          VehicalType: res.data.data.vehicltype || "",
          ModelYear: res.data.data.modelyear || "",
          EngineHP: res.data.data.enginehp || "",
          weight: res.data.data.weight || "",
          chassisNo: res.data.data.chassisno || "",
          importerorowner: res.data.data.importer_or_owner || "",
          color: res.data.data.color || "",
          Declaration: res.data.data.declearationno || "",
          EngineNo: res.data.data.enginno || "",
          Comments: res.data.data.comments || "",
          Datetime: res.data.data.Date || "",
          Load: res.data.data.load || "",
          Origin: res.data.data.origin || "",
          Vehicledrive: res.data.data.Vehicledrive,
          EngineCapacity: res.data.data.EngineCapacity || "",
          PassengerCapacity: res.data.data.PassengerCapacity || "",
          CarriageCapacity: res.data.data.CarriageCapacity || "",
          VehicleBrandName: res.data.data.VehicleBrandName || "",
          SpecificationStandardName:
            res.data.data.SpecificationStandardName || "",
          VCCGenerationDate: res.data.data.VCCGenerationDate || "",
          DeclarationDate: res.data.data.DeclarationDate || "",
          OwnerCode: res.data.data.OwnerCode || "",
        }));

      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getapi()
  }, [])

   const handlePrintTable2 = (tableSelectedRows) => {
     const pdfWidth = 8.26; // in inches
     const pdfHeight = 6.04; // in inches

     // Create a new jsPDF instance with custom dimensions
     const doc = new jsPDF({
       orientation: "landscape",
       unit: "in",
       format: [pdfWidth, pdfHeight],
     });

     const headerStyle =
       "font-weight: bold; background:#3d41cf, color:white ;padding: 5px";
     const logsss = "https://i.ibb.co/bPNS38G/Printer.png";
     const imageshowss = 0;

     const loadImage1 = new Promise((resolve) => {
       const img1 = new Image();
       img1.crossOrigin = "Anonymous";
       img1.src = logsss;
       img1.onload = () => {
         resolve(img1);
       };
     });

     const loadImage2 = new Promise((resolve) => {
       if (imageshowss) {
         const img2 = new Image();
         img2.crossOrigin = "Anonymous";
         img2.src = imageshowss;
         img2.onload = () => {
           resolve(img2);
         };
       } else {
         resolve(null);
       }
     });
    const QRCodeCell = (props) => {
  const url = `https://mirsal2newdubaitradeae.com/view/VehicleCard/${props.cardNo}`;
  return <QRCode value={url} size={24} />;
};

     Promise.all([loadImage1, loadImage2]).then(([img1, img2]) => {
      
       doc.addImage(
         img1,
         "JPEG",
         0,
         0,
         doc.internal.pageSize.getWidth(),
         doc.internal.pageSize.getHeight()
       );

       const tableHtml = `
   <div style='position: relative'>
        <p style="font-size: 0.15px;  margin-top:0.15px ; width:5px; margin-left:0.7px; position: absolute">${value.CardNo}</p>
        <p style="font-size: 0.15px;width:100px; margin-top:0.15px ; margin-left:6.3px; position: absolute ">${value.Datetime}</p>
         <p style="font-size: 0.15px;  margin-top:0.67px ; width:5px; margin-left:1.9px; position: absolute">${value.Load}</p>
        <p style="font-size: 0.15px;  margin-top:0.6px ;width:10px; margin-left:5.9px; position: absolute ">${value.VehicalType}</p>
        <p style="font-size: 0.15px;  margin-top:1.4px ;width:5px; margin-left:5.9px; position: absolute ">${value.ModelYear}</p>
        <p style="font-size: 0.15px; font-weight:500;width:5px; margin-top:1.8px ; margin-left:5.6px; position: absolute ">${value.Origin}</p>
        <p style="font-size: 0.15px;  margin-top:2.3px ;width:5px; margin-left:5.9px; position: absolute ">${value.chassisNo}</p>
        <p style="font-size: 0.15px;  margin-top:2.8px ;width:5px; margin-left:5.9px; position: absolute ">${value.color}</p>
        <p style="font-size: 0.15px;  margin-top:3.3px ;width:5px; margin-left:5.9px; position: absolute ">${value.EngineNo}</p>
         <p style="font-size: 0.15px;  margin-top:4px ;width:5px; width:5px; margin-left:4.3px; position: absolute ">${value.Comments}</p>
          <p style="font-size: 0.15px;  margin-top:1.3px ;width:5px; margin-left:1.6px; position: absolute ">${value.EngineHP}</p>
           <p style="font-size: 0.15px;  margin-top:1.8px ;width:5px; margin-left:1.6px; position: absolute ">${value.weight}</p>
           <p style="font-size: 0.15px;  margin-top:2.3px ;width:10px; margin-left:1.6px; position: absolute ">${value.importerorowner}</p>
           <p style="font-size: 0.15px;  margin-top:2.8px ;width:5px; margin-left:1.6px; position: absolute ">${value.Declaration}</p>
            <p style="font-size: 0.15px;height: 0.5px; width: 0.5px;  margin-top:4.5px ;width:5px; margin-left:0.5px; position: absolute ">${<QRCodeCell />}</p>
       

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
         callback: () => {
           doc.save("table.pdf");
         },
       });
     });
   };


  return (
    <div className="container text-start">
      <div className="border border-secondary mt-4 rounded bg-light">
        <p className="bg-secondary text-white text-start p-2 fw-bolder">
          View VCC Details
        </p>
        <p className="text-danger text-start p-2 fw-bold" style={{ backgroundColor: "transparat" }}>
          VCC/Vehicle Details
        </p>
        <div className="row mx-lg-3 mx-md-3 mx-sm-2">
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">VCC No :</p>
              <p className="col-6">{value.CardNo}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6 " >VCC Status :</p>
              <p className="col-6" style={{ color: "red" }} onClick={handlePrintTable2}>Printed / Downloaded</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">VCC Generation Date:</p>
              <p className="col-6">{value.VCCGenerationDate}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Chassis No:</p>
              <p className="col-6">{value.chassisNo}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Engine Number:</p>
              <p className="col-6">{value.EngineNo}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Years of Build:</p>
              <p className="col-6">{value.ModelYear}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Vehicle Drive:</p>
              <p className="col-6">{value.Vehicledrive}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Country of Origin:</p>
              <p className="col-6">{value.Origin}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Engine Capacity:</p>
              <p className="col-6">{value.EngineCapacity}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Carriage Capacity:</p>
              <p className="col-6">{value.CarriageCapacity}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Passenger Capacity :</p>
              <p className="col-6">{value.PassengerCapacity}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Vehicle Model :</p>
              <p className="col-6">{value.ModelYear}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Vehicle Brand Name :</p>
              <p className="col-6">{value.VehicleBrandName}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Vehicle Type :</p>
              <p className="col-6">{value.VehicalType}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Vehicle Color :</p>
              <p className="col-6">{value.color}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Specification Standard Name :</p>
              <p className="col-6">{value.SpecificationStandardName}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Declaration Number :</p>
              <p className="col-6" style={{ color: "blue" }} >{value.Declaration}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Declaration Date :</p>
              <p className="col-6">{value.DeclarationDate}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Owner Code :</p>
              <p className="col-6">{value.OwnerCode}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Owner Name :</p>
              <p className="col-6">{value.importerorowner}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Print Remarks :</p>
              <p className="col-6">{value.Comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsqrcode;
