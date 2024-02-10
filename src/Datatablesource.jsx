
import QRCode from 'qrcode.react';
const QRCodeCell = props => {
    const url = `https://gs1ksa.org/?gtin=${props.value}`;
    return <QRCode value={url} size={40} />;
};

export const ShipmentRequestColumns = [
    {
        field: 'id',
        headerName: 'SEQ',
        width: 120,
    },
    {
        field: '_id',
        headerName: 'Card No',
        width: 280,
        headerClassName: 'header-red'
    },
    {
        field: 'categoryId',
        headerName: 'Vehical Type',
        width: 220,
        headerClassName: 'header-red'
    },
    {
        field: 'categoryThumbnail',
        headerName: 'Model Year',
        width: 250,
        headerClassName: 'header-red'
    },
     {
        field: "qrcode",
        headerName: 'QR Code',
        renderCell: (params) => <QRCodeCell value={params.row.barcode} />,
        width: 200, // Adjust this width as needed
    },
];