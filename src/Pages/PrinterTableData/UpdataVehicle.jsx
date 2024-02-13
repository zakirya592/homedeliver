import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2"; 
import QRCode from 'qrcode.react';

function UpdataVehicle() {

    let { userId } = useParams();
    console.log(userId);
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        image: '',
        CardNo: '', VehicalType: '', ModelYear: '',
        EngineHP: '', Origin: '', weight: '',
        chassisNo: '', importerorowner: '', color: '',
        Declaration: '', EngineNo: '', Comments: '',
        Datetime: '', Load: '', qrcode:""
    })

    const getapi = () => {
        axios.get(`/get-mirsal/${userId}`)
            .then((res) => {
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
                    Declaration: res.data.data.declearationno || false,
                    EngineNo: res.data.data.enginno || '',
                    Comments: res.data.data.comments || '',
                    Datetime: res.data.data.Date || '',
                    Load: res.data.data.load || '',
                    Origin: res.data.data.origin || '',

                }));

            }).catch ((err) => {
                console.log(err);
            });
        }

        useEffect(() => {
            getapi()
        }, [])
   const QRCodeCell = (props) => {
     const url = `https://mirsal2newdubaitradeae.com/view/VehicleCard/${value.CardNo}`;
     return <QRCode value={url} size={100} />;
   };
        

    const addtransaction = () => {

        axios.put(`/update-mirsal/${userId}`, {
            "vehicltype": value.VehicalType,
            "modelyear": value.ModelYear,
            "enginehp": value.EngineHP,
            "origin": value.Origin,
            "Date": value.Datetime,
            "load": value.Load,
            "weight": value.weight,
            "importer_or_owner": value.importerorowner,
            "chassisno": value.chassisNo,
            "declearationno": value.Declaration,
            "color": value.color,
            "enginno": value.EngineNo,
            "comments": value.Comments,
            "qrcode": value.CardNo

        })
            .then((res) => {
                Swal.fire(
                    'Update!',
                    `vehicle Card No  ${value.CardNo} has been Update successfully`,
                    'success'
                )
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    'Error!',
                    `${err.response.data.message}`,
                    'error'
                )
            });

    };

    return (
        <>
            <div className="bg mt-3">
                <Box sx={{ display: 'flex' }}>
                    {/* <Siderbar /> */}
                    <AppBar className="fortrans locationfortrans" position="fixed">

                    </AppBar>
                    <div className="w-100 p-4" >

                        {/* <center> */}
                        <div className="d-flex justify-content-between mx-3">
                        <h6 className='fw-bolder fs-3 mb-4 text-start my-auto'>UPDATE</h6>
                        <QRCodeCell value={value.CardNo} />
                        </div>
                        {/* </center> */}
                        <div className='mt-3'>

                            <div className="row  p-2 mx-auto mt-5">

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label
                                            htmlFor="CardNo"
                                            className="lablesection colorblack text-start mb-1">
                                            Card No<span className='star'>*</span>
                                        </label>
                                        <input className="form-control inputsection py-2" id="CardNo" placeholder='Card No' type='number'
                                            value={value.CardNo}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    CardNo: e.target.value
                                                }))
                                            }}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="VehicalType" className="lablesection colorblack text-start mb-1">Vehical Type</label>
                                        <input className="form-control inputsection py-2" id="VehicalType" placeholder='Enter Vehical Type' type='text'
                                            value={value.VehicalType}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    VehicalType: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="ModelYear" className="lablesection colorblack text-start mb-1">Model Year</label>

                                        <input className="form-control inputsection py-2" id="ModelYear" placeholder='Enter Model Year' type='number'
                                            value={value.ModelYear}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    ModelYear: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label
                                            htmlFor="CardNo"
                                            className="lablesection colorblack text-start mb-1">
                                            Engine HP<span className='star'>*</span>
                                        </label>
                                        <input className="form-control inputsection py-2" id="EngineHP" placeholder='Enter EngineHP' type='text'
                                            value={value.EngineHP}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    EngineHP: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="Origin" className="lablesection colorblack text-start mb-1">Origin</label>
                                        <input className="form-control inputsection py-2" id="Origin" placeholder='Enter Origin' type='text'
                                            value={value.Origin}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    Origin: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="weight" className="lablesection colorblack text-start mb-1">Weight</label>

                                        <input className="form-control inputsection py-2" id="weight" placeholder='Enter Weight ' type='number'
                                            value={value.weight}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    weight: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label
                                            htmlFor="chassisNo"
                                            className="lablesection colorblack text-start mb-1">
                                            Chassis No<span className='star'>*</span>
                                        </label>
                                        <input className="form-control inputsection py-2" id="chassisNo" placeholder='Enter Chassis No' type='text'
                                            value={value.chassisNo}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    chassisNo: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="importerorowner" className="lablesection colorblack text-start mb-1">Importer Or Owner</label>
                                        <input className="form-control inputsection py-2" id="importerorowner" placeholder='Enter Importer Or Owner' type='text'
                                            value={value.importerorowner}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    importerorowner: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="color" className="lablesection colorblack text-start mb-1">Color</label>

                                        <input className="form-control inputsection py-2" id="color" placeholder='Enter color ' type='text'
                                            value={value.color}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    color: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="EngineNo" className="lablesection colorblack text-start mb-1">Engine No</label>

                                        <input className="form-control inputsection py-2" id="EngineNo" placeholder='Enter Engine No ' type='text'
                                            value={value.EngineNo}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    EngineNo: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="Load" className="lablesection colorblack text-start mb-1">Load</label>

                                        <input className="form-control inputsection py-2" id="Load" placeholder='Enter Load ' type='text'
                                            value={value.Load}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    Load: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="Datetime" className="lablesection colorblack text-start mb-1">Date</label>

                                        <input className="form-control inputsection py-2" id="Datetime" type='date'
                                            value={value.Datetime}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    Datetime: e.target.value
                                                }))
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 mb-2 text-center" >
                                    <div className="mb-3 text-start mt-4">
                                        <input className="inputsection" id="Declaration" type='checkbox'
                                            value={value.Declaration}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    Declaration: e.target.checked
                                                }))
                                            }}
                                        />
                                        <label htmlFor="Declaration" className="lablesection colorblack text-start ms-3">Declaration</label>


                                    </div>
                                </div>

                                <div className="emailsection position-relative d-grid my-2">
                                    <label
                                        htmlFor="Comments"
                                        className="lablesection colorblack text-start mb-1">
                                        Comments
                                    </label>
                                    <textarea
                                        id='ModelYear'
                                        value={value.Comments}
                                        onChange={e => {
                                            setvalue(prevValue => ({
                                                ...prevValue,
                                                Comments: e.target.value
                                            }))
                                        }}
                                        className="form-control inputsection py-2"
                                        placeholder='Enter your Comments'
                                        required
                                    ></textarea>

                                </div>

                            </div>

                        </div>
                        <div className="d-flex justify-content-between mt-5">
                            <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                            <button type="button" class="border-0 px-3 mx-2  savebtn py-2 " onClick={addtransaction}><SaveIcon className='me-2' />SAVE CHANGES</button>

                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default UpdataVehicle