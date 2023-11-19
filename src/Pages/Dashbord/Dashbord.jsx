import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import "./Dashborrd.css";

function Dashbord() {
    return (
        <>
            <div className="bg">
                <div className="mt-5 p-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div className="row mx-auto formsection w-100" >
                            {/* Preventive Maintenance */}
                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                <div className="bgupdata backgroundopen rounded p-3">
                                    <h6 className='fs-4 text-center my-3 '>Active user</h6>
                                    <p className=''>500K</p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                <div className="bgupdata Paddingbackground rounded p-3">
                                    <h6 className='fs-4 text-center my-3 '>Padding</h6>
                                    <p className=''>500K</p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                <div className="bgupdata cancelledgrey rounded p-3">
                                    <h6 className='fs-4 text-center my-3 '>Cancelled</h6>
                                    <p className=''>500K</p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                <div className="bgupdata Inactiveuser rounded p-3">
                                    <h6 className='fs-4 text-center my-3 '>Inactive</h6>
                                    <p className=''>500K</p>
                                </div>
                            </div>

                        </div>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default Dashbord