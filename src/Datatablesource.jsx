
import QRCode from 'qrcode.react';
const QRCodeCell = props => {
    const url = `https://mirsal2newdubaitradeae.com/VehicleDetail/${props.value}`;
    return <QRCode value={url} size={40} />;
};

export const ShipmentRequestColumns = [
 
    {
        field: 'cardno',
        headerName: 'Card No',
        width: 150,
        headerClassName: 'header-red'
    },
    {
        field: 'vehicltype',
        headerName: 'Vehical Type',
        width: 200,
        headerClassName: 'header-red'
    },
    {
        field: 'modelyear',
        headerName: 'Model Year',
        width: 200,
        headerClassName: 'header-red'
    }
    ,
    {
        field: 'chassisno',
        headerName: 'Chassis No',
        width: 200,
        headerClassName: 'header-red'
    },
    {
        field: 'enginno',
        headerName: 'Engine No',
        width: 200,
        headerClassName: 'header-red'
    },
    {
        field: 'color',
        headerName: 'Color',
        width: 150,
        headerClassName: 'header-red'
    },
    {
        field: 'origin',
        headerName: 'Origin',
        width: 200,
        headerClassName: 'header-red'
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 170,
        headerClassName: 'header-red'
    },
    {
        field: 'Date',
        headerName: 'Date',
        width: 170,
        headerClassName: 'header-red'
    },
     {
        field: "cardnos",
        headerName: 'QR Code',
        renderCell: (params) => <QRCodeCell value={params.row.cardno} />,
    },
];