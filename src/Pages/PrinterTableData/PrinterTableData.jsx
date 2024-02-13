import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Siderbar from '../../Component/Sidbar/Siderbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PrintIcon from '@mui/icons-material/Print'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { ShipmentRequestColumns } from '../../Datatablesource'
import Datatable from '../../Component/DataTable/Datatable'
import { DataTableContext } from '../../Contexts/DataTableContext'

function PrinterTableData()
{
    const [getdata, setgetdata] = useState([])
    const { tableSelectedRows, setTableSelectedExportRows } =
        useContext(DataTableContext)
    const [imageshow, setimageshow] = useState()
    const navigate = useNavigate()

    const getapi = () =>
    {
        axios.get(`/get-mirsal`).then(res =>
        {
            setgetdata(res.data.data)
            console.log(res.data.data)
        }).catch(err =>
        {
            console.log(err)
        })
    }

    useEffect(() =>
    {
        getapi()
    }, [])

    const handlePrintTable2 = tableSelectedRows =>
    {
        const printWindow = window.open('', '_blank')
        const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px'
        const logsss = 'https://i.ibb.co/bPNS38G/Printer.png'
        const imageshowss = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(tableSelectedRows[0].cardno)}&size=80x80` // Replace with your second image URL
        // Create promises to load both images
        const loadImage1 = new Promise(resolve =>
        {
            const img1 = new Image()
            img1.src = logsss
            img1.onload = () =>
            {
                resolve(img1)
            }
        })

        const loadImage2 = new Promise(resolve =>
        {
            if (imageshowss) {
                const img2 = new Image()
                img2.src = imageshowss
                img2.onload = () =>
                {
                    resolve(img2)
                }
            } else {
                const img2 = new Image()
                img2.src = null
                resolve(img2)
            }
        })
        Promise.all([loadImage1, loadImage2]).then(([img1, img2]) =>
        {
            const tableHtml = `
    <div>
<img src=${img1.src} alt='logo' width='100%' " style='height: 100%; position: relative'/>
<p style='position: absolute;
    top: 15%;
    left: 9%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].cardno}
</p>
<p style='position: absolute;
    top: 15%;
    right: 13%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].Date}
</p>
<p style='position: absolute;
    top: 22%;
    right: 25%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].vehicltype}
</p>
<p style='position: absolute;
    top: 24%;
    left: 37%;
     transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].load}
</p>
<p style='position: absolute;
    top: 35%;
    right: 16%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].modelyear}
</p>
<p style='position: absolute;
    top: 36%;
    left: 32%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].enginehp}
</p>
<p style='position: absolute;
    top: 43%;
    left: 32%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].weight}
</p>
<p style='position: absolute;
    top: 43%;
    right: 15%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].origin}
</p>
<p style='position: absolute;
    top: 51%;
    right: 15%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].chassisno}
</p>
<p style='position: absolute;
    top: 59%;
    right: 13%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].color}
</p>
<p style='position: absolute;
    top: 66%;
    right: 16%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].enginno}
</p>
<p style='position: absolute;
    top: 79%;
    left: 51%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].comments}
</p>
<p style='position: absolute;
    top: 51%;
    right: 67%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].declearationno}
</p>
<p style='position: absolute;
    top: 59%;
    right: 67%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
${tableSelectedRows[0].importer_or_owner} comment
</p>
<p style='position: absolute;
    top: 80%;
    left: 8%;
    font-size: 16px;
    font-weight: bold;
    color: #140d0d;'>
<img src=${img2.src} alt='logo'/>
</p>

    `

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
    `

            printWindow.document.write(printContent)
            printWindow.document.close()
            printWindow.print()
        })
    }

    const handleRowClickInParent = item =>
    {
        if (!item || item?.length === 0) {
            // setTableSelectedRows(data)
            setTableSelectedExportRows(item)
            return
        }
    }



    const handleDownloadPDF = (tableSelectedRows) =>
    {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [6.04, 8.26],
        });

        // Add background image
        const backgroundImage = "https://i.ibb.co/pvNXhDC/Printer.png";
        doc.addImage(backgroundImage, 0, 0, 8.26, 6.04);
        const rowData = [
            [tableSelectedRows[0].cardno, tableSelectedRows[0].Date],
            //    [tableSelectedRows[0].vehicltype, tableSelectedRows[0].load],
            [tableSelectedRows[0].load, tableSelectedRows[0].vehicltype],
            [tableSelectedRows[0].modelyear, tableSelectedRows[0].enginehp],
            [tableSelectedRows[0].weight],
            [tableSelectedRows[0].origin],
            [tableSelectedRows[0].chassisno],
            [tableSelectedRows[0].color],
            [tableSelectedRows[0].enginno],
            [tableSelectedRows[0].declearationno],
            [tableSelectedRows[0].importer_or_owner],
            [tableSelectedRows[0].comments],
            [tableSelectedRows[0].cardno],
        ];
        doc.autoTable({
            body: rowData,
            // columnStyles: columnStyles,
            // styles: styles,

            startY: 1,
            margin: { top: 15 },
            theme: "plain",
            styles: {
                halign: "left",
                valign: "center",
                fontSize: 11,
                fillColor: null,
                textColor: null,
                background: null,
                margin: "60",
                tableWidth: 180,
            },
            useCss: true,
        });

        // Save the PDF file
        doc.save("table_data.pdf");
    };



    const printerfuunction = (selectedRow) =>
    {
        console.log(tableSelectedRows);
        if (tableSelectedRows.length === 1) {
            handleDownloadPDF(tableSelectedRows);
        } else if (tableSelectedRows.length > 1) {
            Swal.fire("Error!", "Select only one row to print the data", "error");
        } else {
            Swal.fire("Error!", `To Select the Row to Print the Data`, "error");
        }
    };

    const handleView = row =>
    {
        navigate(`/view/VehicleCard/${row.cardno}`)
    }

    const handleUpdate = row =>
    {
        navigate(`/Update/VehicleCard/${row.cardno}`)
    }

    const handleDelete = row =>
    {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: `You want to delete this ${row.cardno} Card Number`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })
            .then(result =>
            {
                if (result.isConfirmed) {
                    axios
                        .delete(`/delete-mirsal/${row.cardno}`)
                        .then(res =>
                        {
                            getapi()
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                `Card Number ${row.cardno} has been deleted.`,
                                'success'
                            )
                            getapi()
                        })
                        .catch(err =>
                        {
                            console.log('Error deleting', err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            })
                        })
                }
            })
    }

    return (
        <>
            <div className="bg">
                <div className="mt-3 p-3">
                    <Box sx={{ display: "flex" }}>
                        {/* <Siderbar /> */}
                        <AppBar
                            className="fortrans locationfortrans"
                            position="fixed"
                        ></AppBar>
                        <div
                            style={{
                                height: 450,
                                width: "100%",
                                background: `url("../../img/Printer.png")`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className=" justify-content-between my-4 w-100 d-sm-flex d-md-flex d-lg-flex shadow-sm shadow p-4 mb-4 bg-white">
                                <h5 className="text-lg-start my-auto text-sm-center d-sm-none d-md-flex">
                                    vehicle List
                                </h5>
                                <div className=" d-flex justify-content-md-start justify-content-sm-between">
                                    <button
                                        type="button"
                                        className="rounded py-1 px-2  mx-1 color2 btnwork"
                                        onClick={() =>
                                        {
                                            navigate("/Create/Createtableprint");
                                        }}
                                    >
                                        <AddCircleOutlineIcon className="me-1" />
                                        Create
                                    </button>
                                    {/* <button
                                        onClick={printerfuunction}
                                        className='rounded py-1 px-2 mx-1 color2 btnwork'
                                    >
                                        <PrintIcon className='me-1' /> Print
                                    </button> */}
                                    <button
                                        onClick={printerfuunction}
                                        className="rounded py-1 px-2  mx-lg-1 color2 btnwork"
                                    >
                                        <PictureAsPdfIcon className="me-1" />
                                        PDF
                                    </button>
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
                                        label: "View",
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
                                        label: "Update",
                                        icon: (
                                            <EditIcon
                                                fontSize="small"
                                                style={{ color: "rgb(37 99 235)" }}
                                            />
                                        ),
                                        action: handleUpdate,
                                    },
                                    {
                                        label: "Delete",
                                        icon: (
                                            <DeleteIcon
                                                fontSize="small"
                                                style={{ color: "#FF0032" }}
                                            />
                                        ),
                                        action: handleDelete,
                                    },
                                ]}
                            />
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default PrinterTableData
