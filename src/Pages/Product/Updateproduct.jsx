import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import axios from 'axios';
import upload from '../../img/uploadimg.png'
import BrowserFolder from "../../img/browsefolder 3.png"
import "./Product.css"
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";

function Updateproduct() {
    const navigate = useNavigate();
    let { userId } = useParams();
    const [value, setvalue] = useState({
        image: '',
        itemName: '', price: '', category: '',
        description: ''
    })

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState()
    const [AssetImage, setAssetImage] = useState()

    const getapi = () => {
        axios.get(`/get-item-byid/${userId}`)
            .then((res) => {
                const {
                    itemName,
                    price,
                    category,
                    description
                } = res.data.data;
                const imgass = res.data.data.image
                setimageshow(imgass)
                setvalue((prevValue) => ({
                    ...prevValue,
                    itemName,
                    price,
                    category,
                    description
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    })


    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setAssetImage(e.target.files[0])
    }

    const addtransaction = async () => {

        const formData = new FormData();
        formData.append('itemName', value.itemName);
        formData.append('price', value.price);
        formData.append('description', value.description);
        formData.append('category', value.category);
        formData.append('image', AssetImage);

        axios.put(`/update-items/${userId}`, formData)
            .then((res) => {
                Swal.fire(
                    'Update!',
                    `Product ${userId} has been created successfully`,
                    'success'
                )
                navigate('/Product')

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.data.message
                Swal.fire(
                    'Error!',
                    ` ${statuss} `,
                    'error'
                )
            });
    };

    return (
        <>
            <div className="bg mt-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div className="w-100 p-4" >

                            <center>
                                <h6 className='fw-bolder fs-3 colorblack workitoppro mb-4'>Update Product</h6>
                            </center>
                            <div className='mt-3'>

                                <div className="printerPic my-3 w-100">
                                    <div className="d-flex ">
                                        <div className="">
                                            <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : upload} alt="userimg" className="printerpic" />
                                        </div>
                                        <div className="mx-4 my-auto">
                                            <div className="row " htmlFor="file-inputs">
                                                <label htmlFor="file-inputs">
                                                    <img src={BrowserFolder} alt="Description of the BrowserFolder" />
                                                </label>
                                                <input
                                                    id="file-inputs"
                                                    type="file"
                                                    onChange={handleChangeback}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row  p-2 mx-auto mt-5">

                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                        <div className="mb-3 text-start">
                                            <label
                                                htmlFor="itemName"
                                                className="lablesection colorblack text-start mb-1">
                                                Item Name<span className='star'>*</span>
                                            </label>
                                            <input className="form-control inputsection py-2" id="FirstName" placeholder='Enter Item Name' types='text'
                                                value={value.itemName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        itemName: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                        <div className="mb-3 text-start">
                                            <label htmlFor="price" className="lablesection colorblack text-start mb-1">Price</label>
                                            <input className="form-control inputsection py-2" id="price" placeholder='Enter price' type='number'
                                                value={value.price}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        price: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-2">
                                        <div className="mb-3 text-start">
                                            <label htmlFor="category" className="lablesection colorblack text-start mb-1">Category</label>
                                            <input className="form-control inputsection py-2" id="category" placeholder='Enter category' types='text'
                                                value={value.category}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        category: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="emailsection position-relative d-grid my-2">
                                        <label
                                            htmlFor="Description"
                                            className="lablesection colorblack text-start mb-1">
                                            Description
                                        </label>
                                        <input
                                            types='text'
                                            id='category'
                                            value={value.description}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    description: e.target.value
                                                }))
                                            }}
                                            className="form-control inputsection py-2"
                                            placeholder='Enter your Description'
                                            required
                                        ></input>

                                    </div>

                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-5">
                                <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/Product')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>

                            </div>
                        </div>
                    </Box>
            </div>
        </>
    )
}

export default Updateproduct