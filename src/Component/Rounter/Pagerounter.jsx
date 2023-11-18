import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your pages
import Dashbord from '../../Pages/Dashbord/Dashbord';
import Product from '../../Pages/Product/Product';
import Userdata from '../../Pages/User/Userdata';
import Createproduct from '../../Pages/Product/Createproduct';
import Viewproduct from '../../Pages/Product/Viewproduct';
import Updateproduct from '../../Pages/Product/Updateproduct';

function App() {
    return (
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
