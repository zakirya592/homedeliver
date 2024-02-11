import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your pages
import PrinterTableData from '../../Pages/PrinterTableData/PrinterTableData';
import Createtableprint from '../../Pages/PrinterTableData/Createtableprint';
import DataTableProvider from '../../Contexts/DataTableContext';

function App() {
    return (
        <DataTableProvider>
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<PrinterTableData />} />
                <Route path='/Create/Createtableprint' element={<Createtableprint />} />
            </Routes>
        </BrowserRouter>
        </DataTableProvider>
    );
}

export default App;
