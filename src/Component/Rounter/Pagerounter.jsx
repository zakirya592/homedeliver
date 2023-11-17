import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your pages
import Dashbord from '../../Pages/Dashbord/Dashbord';
import Product from '../../Pages/Product/Product';

function App() {
    return (
        <BrowserRouter>

            <Routes>
                {/* ---------Dashbord Section----------- */}
                <Route path='/' element={<Dashbord />} />
                {/* ---------Product Section----------- */}
                <Route path='/Product' element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
