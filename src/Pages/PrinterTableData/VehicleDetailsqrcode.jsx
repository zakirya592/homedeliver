import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VehicleDetailsqrcode = () =>
{
  let { cardNo } = useParams();
  const [value, setvalue] = useState({
    image: '',
    CardNo: '', VehicalType: '', ModelYear: '',
    EngineHP: '', Origin: '', weight: '',
    chassisNo: '', importerorowner: '', color: '',
    Declaration: '', EngineNo: '', Comments: '',
    Datetime: '', Load: '', qrcode: ""
  })
  const getapi = () =>
  {
    axios.get(`/get-mirsal/${cardNo}`)
      .then((res) =>
      {
        console.log(res);
        setvalue((prevValue) => ({
          ...prevValue,
          CardNo: res.data.data.cardno || '',
          VehicalType: res.data.data.vehicltype || '',
          ModelYear: res.data.data.modelyear || '',
          EngineHP: res.data.data.enginehp || '',
          weight: res.data.data.weight || '',
          chassisNo: res.data.data.chassisno || '',
          importerorowner: res.data.data.importer_or_owner || '',
          color: res.data.data.color || '',
          Declaration: res.data.data.declearationno || '',
          EngineNo: res.data.data.enginno || '',
          Comments: res.data.data.comments || '',
          Datetime: res.data.data.Date || '',
          Load: res.data.data.load || '',
          Origin: res.data.data.origin || '',
        }));

      }).catch((err) =>
      {
        console.log(err);
      });
  }

  useEffect(() =>
  {
    getapi()
  }, [])
  return (
    <div className="container text-start">
      <div className="border border-secondary mt-4 rounded bg-light">
        <p className="bg-secondary text-white text-start p-2 fw-bolder">
          View VCC Details
        </p>
        <p className="text-danger text-start p-2 fw-bold" style={{backgroundColor:"transparat"}}>
          VCC/Vehicle Details
        </p>
        <div className="row mx-3">
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">VCC No :</p>
              <p className="col-6">{value.CardNo}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6" >VCC Status :</p>
              <p className="col-6" style={{ color: "red" }}>Printed/Downloaded</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">VCC Generation Date:</p>
              <p className="col-6">{value.Datetime}</p>
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
              <p className="col-6">Left hand</p>
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
              <p className="col-6">Cancelled</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Carriage Capacity:</p>
              <p className="col-6">2023</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Passenger Capacity :</p>
              <p className="col-6">Cancelled</p>
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
              <p className="col-6">Cancelled</p>
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
              <p className="col-6">2023</p>
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
              <p className="col-6">{value.Datetime}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 ">
            <div className="row">
              <p className="col-6">Owner Code :</p>
              <p className="col-6">2023</p>
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
