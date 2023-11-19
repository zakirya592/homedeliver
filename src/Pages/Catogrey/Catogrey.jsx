import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Catogrey() {
    const [getdata, setgetdata] = useState([])
    const navigate = useNavigate();

    const getapi = () => {
        axios.get(`/get-catogray`)
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
        { field: 'id', headerName: 'SEQ.', width: 120, headerClassName: 'header-red' },
        { field: '_id', headerName: 'ID#', width: 280, headerClassName: 'header-red' },
        { field: 'categoryId', headerName: 'Category ID', width: 220, headerClassName: 'header-red' },
        {field: 'categoryThumbnail', headerName: 'Category Thumbnail', width: 230, headerClassName: 'header-red',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar src={params.row.categoryThumbnail} />
                </div>
            ),
        },
        { field: 'category', headerName: 'Category', width: 250, headerClassName: 'header-red' },
        { field: 'ACTIONS', headerName: 'ACTIONS', headerClassName: 'header-red', width: 200, renderCell: ActionButtons },
    ];

    function ActionButtons(params) {

        const Deletedapi = (category) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success mx-2',
                    cancelButton: 'btn btn-danger mx-2',
                    // actions: 'mx-3'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `Do you want to deleting ${category} Catogrey!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/delete-catogray/${category}`)
                        .then((res) => {
                            getapi()
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                `Catogrey  ${category}  has been deleted.`,
                                'success'
                            )
                        })
                        .catch((err) => {
                            // Handle delete error
                            console.log('Error deleting', err);
                            swalWithBootstrapButtons.fire(
                                'Error!',
                                `${err.response.data.message}`,
                                'error'
                            )
                        });
                }
            })

        };

        return (
            <div>
                <MenuItem onClick={() => {
                    Deletedapi(params.row.category)
                }}>
                    <span style={{ paddingRight: '10px' }}>Delete</span>
                    <DeleteIcon />
                </MenuItem>
            </div>
        );
    }

    const filteredRows = getdata && getdata.map((row, index) => {
        return {
            ...row,
            id: index + 1,
            _id: row._id,
            categoryThumbnail: row.categoryThumbnail,
            categoryId: row.categoryId,
            category: row.category,
        };
    });

    return (
        <>
            <div className="bg">
                <div className="mt-3 p-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div style={{ height: 450, width: '83%' }}>
                            <div className="d-flex justify-content-between my-4">
                                <h5 className='text-start my-auto'>Catogrey List</h5>
                                <button type="button" className="rounded py-1 px-2 mx-1 color2 btnwork" onClick={(() => {
                                    navigate('/Create/Catogrey')
                                })}><AddCircleOutlineIcon className='me-1' />Create</button>
                            </div>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                disableMultipleSelection
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

export default Catogrey