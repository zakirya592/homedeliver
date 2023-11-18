import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import "./Product.css"
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";

function Product() {
    const [getdata, setgetdata] = useState([])
    const navigate = useNavigate();

    const getapi = () => {
        axios.get(`/get-allitem`)
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

        { field: '_id', headerName: 'ID#', width: 250, headerClassName: 'header-red' },
        {
            field: 'combinedItem', headerName: 'item Name #', width: 200, headerClassName: 'header-red',
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={params.row.image} />
                    <div style={{ marginLeft: '10px' }}>{params.row.itemName}</div>
                </div>
            ),
        },
        { field: 'price', headerName: 'Price #', width: 160, headerClassName: 'header-red' },
        { field: 'category', headerName: 'Category #', width: 200, headerClassName: 'header-red' },
        { field: 'description', headerName: 'Description #', width: 250, headerClassName: 'header-red' },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const Deletedapi = (itemName) => {
            handleMenuClose();
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
                text: `Do you want to deleting ${itemName} Product!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/delete-items/${itemName}`)
                        .then((res) => {
                            getapi()
                        })
                        .catch((err) => {
                            // Handle delete error
                            console.log('Error deleting', err);
                        });
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        `Product  ${itemName}  has been deleted.`,
                        'success'
                    )
                }
            })

        };

        const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <Button className='actionBtn' onClick={handleMenuOpen} style={{ color: "black" }}>
                    <span style={{ paddingRight: '10px' }}>Action</span>
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={(() => {
                        navigate(`/view/Product/${params.row._id}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={(() => {
                        navigate(`/update/Product/${params.row._id}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem
                        onClick={() => Deletedapi(params.row.itemName)}
                    >
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }

    const filteredRows = getdata && getdata.map((row, index) => {
        return {
            ...row,
            id: index + 1,
            _id: row._id,
            combinedItem: `${row.image} ${row.itemName}`,
            price: row.price,
            category: row.category,
            description: row.description,
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
                            <h5 className='text-start my-4'>Product List</h5>
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

export default Product