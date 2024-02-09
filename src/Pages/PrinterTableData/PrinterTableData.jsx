import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PrintIcon from '@mui/icons-material/Print';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ShipmentRequestColumns } from '../../Datatablesource';
import Datatable from '../../Component/DataTable/Datatable';
import { DataTableContext } from '../../Contexts/DataTableContext';


function PrinterTableData() {
    const [getdata, setgetdata] = useState([])
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows, tableSelectedExportRows, setTableSelectedExportRows } = useContext(DataTableContext);

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

    const [imageshow, setimageshow] = useState()
    const handlePrintTable2 = (tableSelectedRows) => {
        const printWindow = window.open('', '_blank');
        const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';
        const logsss = 'https://i.ibb.co/bPNS38G/Printer.png'
        const imageshowss = imageshow; // Replace with your second image URL

        // Create promises to load both images
        const loadImage1 = new Promise((resolve) => {
            const img1 = new Image();
            img1.src = logsss;
            img1.onload = () => {
                resolve(img1);
            };
        });

        const loadImage2 = new Promise((resolve) => {
            if (imageshowss) {
                const img2 = new Image();
                img2.src = imageshowss;
                img2.onload = () => {
                    resolve(img2);
                };
            } else {
                const img2 = new Image();
                img2.src = null;

                resolve(img2); // Resolve with null if imageshowss is empty
            }
        });
        Promise.all([loadImage1, loadImage2])
            .then(([img1, img2]) => {
                const tableHtml = `
    <div>
<img src=${img1.src} alt='logo' width='100%' " style='height: 100%; position: relative'/>
<p style='position: absolute;
    top: 15%;
    left: 9%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 15%;
    right: 13%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 22%;
    right: 25%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 24%;
    left: 37%;
     transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 35%;
    right: 16%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 36%;
    left: 32%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 43%;
    left: 32%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 43%;
    right: 15%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 51%;
    right: 15%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 59%;
    right: 13%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 66%;
    right: 16%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 79%;
    left: 51%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 51%;
    right: 67%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 59%;
    right: 67%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>
<p style='position: absolute;
    top: 85%;
    left: 8%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].category}
</p>

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
        <body >${tableHtml}</body>
      </html>
    `;

                printWindow.document.write(printContent);
                printWindow.document.close();
                printWindow.print();
            })
    };

    const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
            // setTableSelectedRows(data)
            setTableSelectedExportRows(item)
            console.log(item);
            return
        }
    }

    const printerfuunction = (selectedRow) => {
        console.log(tableSelectedRows);
        if (tableSelectedRows.length === 1) {
            handlePrintTable2(filteredRows)
        }
        else if (tableSelectedRows.length > 1) {
            Swal.fire(
                'Error!',
                'Select only one row to print the data',
                'error'
            );
        }
        else {
            Swal.fire(
                'Error!',
                `To Select the Row to Print the Data`,
                'error'
            )
        }
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Get the columns from the DataGrid component
        const pdfColumns = ShipmentRequestColumns.map((column) => column.headerName);

        // Get the rows from the DataGrid component
        const pdfRows = getdata.map((row) => ShipmentRequestColumns.map((column) => row[column.field]));

        // Add the table to the PDF document
        doc.autoTable({
            head: [pdfColumns],
            body: pdfRows,
        });

        // Save the PDF file
        doc.save('table_data.pdf');
    };

    const handleView = (row) => {
        console.log(row);
    };

    return (
        <>
            <div className="bg">
                <div className="mt-3 p-3">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">

                        </AppBar>
                        <div style={{ height: 450, width: '83%', background: `url("../../img/Printer.png")`, backgroundSize: 'cover' }}>
                            <div className="d-flex justify-content-between my-4">
                                <h5 className='text-start my-auto'>PrinterTableData List</h5>
                                <div>
                                    <button type="button" className="rounded py-1 px-2 mx-1 color2 btnwork" onClick={(() => {
                                        navigate('/Create/Createtableprint')
                                    })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                    <button onClick={printerfuunction} className="rounded py-1 px-2 mx-1 color2 btnwork">
                                        <PrintIcon className='me-1' /> Print
                                    </button>
                                    <button onClick={handleDownloadPDF} className="rounded py-1 px-2 mx-1 color2 btnwork">
                                        <PictureAsPdfIcon className='me-1' />PDF</button>

                                </div>

                            </div>
                            <Datatable
                                data={getdata}
                                columnsName={ShipmentRequestColumns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                disableMultipleSelection
                                uniqueId="customerListId"
                                handleRowClickInParent={handleRowClickInParent}
                                dropDownOptions={[
                                    {
                                      label: 'View',
                                      icon: (
                                        <VisibilityIcon
                                          fontSize="small"
                                          color="action"
                                          style={{ color: "rgb(37 99 235)" }}
                                        />
                                      ),
                                      action: handleView,
                                    },
                                    ,
                                    {
                                        label: 'Update',
                                        icon: <EditIcon fontSize="small" style={{ color: 'rgb(37 99 235)' }} />
                                        ,
                                        // action: handleDelete,
                                    }
                                    ,
                                    {
                                        label: 'Delete',
                                        icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                                        ,
                                        // action: handleDelete,
                                    }
                                   

                                ]}
                            />
                        </div>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default PrinterTableData