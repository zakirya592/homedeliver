import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../Component/Sidbar/Siderbar';
import axios from 'axios';
import upload from '../../img/uploadimg.png'
import BrowserFolder from "../../img/browsefolder 3.png"
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";

function Createcatogrey() {

    const navigate = useNavigate();
    const [value, setvalue] = useState({
        image: '',Category: ''
    })
    const [selectedFile, setSelectedFile] = useState(null);
    const imageshow = '';
    const [AssetImage, setAssetImage] = useState()

    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setAssetImage(e.target.files[0])
    }

    const addtransaction = () => {
        const formData = new FormData();
        formData.append('category', value.Category);
        formData.append('categoryThumbnail', AssetImage);

        axios.post(`/add-catogray`, formData)
            .then((res) => {
                Swal.fire(
                    'Created!',
                    `category ${value.Category} has been created successfully`,
                    'success'
                )
                navigate('/Catogrey')
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
                    <Siderbar />
                    <div className="w-100 p-4" >

                        <center>
                            <h6 className='fw-bolder fs-3 workitoppro mb-4'>Create new Catogrey</h6>
                        </center>
                        <div className='mt-3'>

                            <div className="printerPic my-3 w-100">
                                <div className="d-flex ">
                                    <div className="">
                                        <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : upload} alt="Description of the user" className="printerpic" />
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

                            <div className="row p-2 mx-auto mt-5">

                                <div className="emailsection position-relative d-grid my-2">
                                    <label
                                        htmlFor="Category"
                                        className="lablesection colorblack text-start mb-1">
                                        Category
                                    </label>
                                    <input
                                        types='text'
                                        id='category'
                                        value={value.Category}
                                        onChange={e => {
                                            setvalue(prevValue => ({
                                                ...prevValue,
                                                Category: e.target.value
                                            }))
                                        }}
                                        className="form-control inputsection py-2"
                                        placeholder='Enter your Category'
                                        required
                                    ></input>

                                </div>

                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                            <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/Catogrey')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                            <button type="button" class="border-0 px-3 mx-2  savebtn py-2 " onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>

                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default Createcatogrey