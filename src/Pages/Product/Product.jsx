import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import { DataGrid } from '@mui/x-data-grid';
import "./Product.css"
function Product() {

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90, headerClassName: 'header-red' },
        { field: 'RequestNumber', headerName: 'WORK REQUEST#', width: 160, headerClassName: 'header-red' },
        { field: 'RequestStatus', headerName: 'REQUEST STATUS', width: 160, headerClassName: 'header-red' },
        { field: 'EmployeeID', headerName: 'REQUEST BY EMP#', width: 160, headerClassName: 'header-red' },
        { field: 'WorkPriority', headerName: 'PRIORITY', width: 150, headerClassName: 'header-red' },
        { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200, headerClassName: 'header-red' },
        { field: 'workTypeDesc', headerName: 'WORK TYPE DESC', width: 160, headerClassName: 'header-red' },
        { field: 'worktradeDesc', headerName: 'WORK TRADE DESC', width: 160, headerClassName: 'header-red' },
        // { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    const numberOfRows = 100;

    const filteredRows = Array.from({ length: numberOfRows }, (_, index) => ({
        id: index + 1,
        RequestNumber: `WR${index + 1}`,
        RequestStatus: 'Pending',
        EmployeeID: `EMP${index + 1}`,
        WorkPriority: index % 2 === 0 ? 'High' : 'Low',
        RequestDateTime: new Date().toISOString(), // You may want to format this based on your requirements
        workTypeDesc: `Work Type ${index + 1}`,
        worktradeDesc: `Trade Desc ${index + 1}`,
    }));
    return (
        <>
            <div className="bg mt-4">
                <div className="mt-5 p-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div style={{ height: 450,width:'83%' }}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                disableMultipleSelection
                                pagination={false}  // Set pagination to false to hide pagination controls
                                components={{
                                    Footer: () => null, // Render an empty Footer to hide pagination footer
                                }}                            />
                        </div>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default Product