import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your pages
import Dashbord from '../../Pages/Dashbord/Dashbord';
import Product from '../../Pages/Product/Product';
import Userdata from '../../Pages/User/Userdata';
import Createproduct from '../../Pages/Product/Createproduct';
import Viewproduct from '../../Pages/Product/Viewproduct';
import Updateproduct from '../../Pages/Product/Updateproduct';
import Catogrey from '../../Pages/Catogrey/Catogrey';
import Createcatogrey from '../../Pages/Catogrey/Createcatogrey';
import PrinterTableData from '../../Pages/PrinterTableData/PrinterTableData';
import Createtableprint from '../../Pages/PrinterTableData/Createtableprint';
import DataTableProvider from '../../Contexts/DataTableContext';

function App() {
    return (
        <DataTableProvider>
        <BrowserRouter>

            <Routes>
                {/* ---------Dashbord Section----------- */}
                <Route path='/' element={<Dashbord />} />
                {/* ---------Product Section----------- */}
                <Route path='/Create/Product' element={<Createproduct />} />
                <Route path='/Product' element={<Product />} />
                <Route path='/view/Product/:userId' element={<Viewproduct />} />
                <Route path='/update/Product/:userId' element={<Updateproduct />} />
                {/* ---------Userdata Section----------- */}
                <Route path='/user' element={<Userdata />} />
                {/* ---------Catogrey Section----------- */}
                <Route path='/Create/Catogrey' element={<Createcatogrey />} />
                <Route path='/Catogrey' element={<Catogrey />} />
                <Route path='/PrinterTableData' element={<PrinterTableData />} />
                <Route path='/Create/Createtableprint' element={<Createtableprint />} />
            </Routes>
        </BrowserRouter>
        </DataTableProvider>
    );
}

export default App;
