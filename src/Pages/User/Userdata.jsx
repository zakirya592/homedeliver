import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function Userdata() {
    const [getdata, setgetdata] = useState([])

    const getapi = () => {
        axios.get(`/get-alluser-detail`)
            .then((res) => {
                setgetdata(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90, headerClassName: 'header-red' },
        { field: 'Phone', headerName: 'Phone#', width: 160, headerClassName: 'header-red' },
        { field: 'email', headerName: 'Email#', width: 200, headerClassName: 'header-red' },
        { field: 'address', headerName: 'Address#', width: 160, headerClassName: 'header-red' },
        { field: 'WorkPriority', headerName: 'PRIORITY', width: 200, headerClassName: 'header-red' },
        { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200, headerClassName: 'header-red' },
        { field: 'workTypeDesc', headerName: 'WORK TYPE DESC', width: 200, headerClassName: 'header-red' },
        // { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    const filteredRows = getdata && getdata.map((row, index) => {
        return {
            ...row,
            id: index + 1,
            Phone: row.Phone,
            email: row.email,
            address: row.address, // Combine first name, middle name, and last name
            NationalityCode: row.NationalityCode,
            Latitude: row.Latitude,
            Longtitude: row.Longtitude,
            Gender: row.Gender,
        };
    });
    return (
        <>
            <div className="bg mt-4">
                <div className="mt-5 p-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div style={{ height: 450, width: '83%' }}>
                            <h5 className='text-start my-4'>User List</h5>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                disableMultipleSelection
                                pagination={false}  // Set pagination to false to hide pagination controls
                                components={{
                                    Footer: () => null, // Render an empty Footer to hide pagination footer
                                }} />
                        </div>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default Userdata