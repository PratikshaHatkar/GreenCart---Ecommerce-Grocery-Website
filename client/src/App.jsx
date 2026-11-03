// import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import FarmerLogin from "./components/farmer/FarmerLogin";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import Loading from "./components/Loading";
import PaymentSuccess from "./components/PaymentSuccess";

import FarmerLayout from "./pages/farmer/FarmerLayout";
import AddProduct from "./pages/farmer/AddProduct";
import ProductList from "./pages/farmer/ProductList";
import Orders from "./pages/farmer/Orders";

import AdminLayout from "./pages/admin/AdminLayout.jsx";

import { useAppContext } from "./context/AppContext";
import EditProduct from "./pages/farmer/EditPage";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";

function App() {
    const location = useLocation();

    const { showUserLogin } = useAppContext();

    const isFarmerRoute = location.pathname.startsWith("/farmer");
    const isAdminRoute = location.pathname.startsWith("/admin");

    const hideNavbarFooter = isFarmerRoute || isAdminRoute;

    return (
        <div className=" text-default min-h-screen text-gray-700 bg-white">

            {!hideNavbarFooter && <Navbar/>}

            {showUserLogin && <Login />}

            <Toaster />

            <div
                className={`${
                    hideNavbarFooter
                        ? ""
                        : "px-6 md:px-16 lg:px-24 xl:px-32 pt-20"
                }`}
            >
                <Routes>

                    {/* ================= Consumer ================= */}

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/products"
                        element={<AllProducts />}
                    />

                    <Route
                        path="/products/:category"
                        element={<ProductCategory />}
                    />

                    <Route
                        path="/products/:category/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/add-address"
                        element={<AddAddress />}
                    />

                    <Route
                        path="/my-orders"
                        element={<MyOrders />}
                    />

                    <Route
                        path="/loader"
                        element={<Loading />}
                    />

                    <Route
                        path="/paymentSuccess"
                        element={<PaymentSuccess />}
                    />

                    {/* ================= Farmer ================= */}

                    <Route path="/farmer" element={<FarmerLayout />}>

                        <Route
                            index
                            element={<AddProduct />}
                        />

                    <Route
                     path="edit-product/:id"
                     element={<EditProduct />}
                        />

                        <Route
                            path="dashboard"
                            element={<FarmerDashboard />}
                        />
                        <Route
                            path="add-product"
                            element={<AddProduct />}
                        />
                        <Route
                            path="login"
                            element={<FarmerLogin />}
                        />

                        <Route
                            path="product-list"
                            element={<ProductList />}
                        />

                        <Route
                            path="orders"
                            element={<Orders />}
                        />

                    </Route>

                    {/* ================= Admin ================= */}

                    <Route
                        path="/admin/*"
                        element={<AdminLayout />}
                    />

                </Routes>
            </div>

            {!hideNavbarFooter && <Footer />}
        </div>
    );
}

export default App;










// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import {Toaster} from 'react-hot-toast'
// import Footer from './components/Footer'
// import { useAppContext } from './context/AppContext'
// import Login from './components/Login'
// import AllProducts from './pages/AllProducts'
// import ProductCategory from './pages/ProductCategory'
// import ProductDetails from './pages/ProductDetails'
// import Cart from './pages/Cart'
// import AddAddress from './pages/AddAddress'
// import MyOrders from './pages/MyOrders'
// import Loading from './components/Loading'
// import SellerLogin from './components/seller/SellerLogin'
// import SellerLayout from './pages/seller/SellerLayout'
// import AddProduct from './pages/seller/AddProduct'
// import ProductList from './pages/seller/ProductList'
// import Orders from './pages/seller/Orders'
// import FarmerLogin from './components/Farmer/FarmerLogin'

// import PaymentSuccess from './components/PaymentSuccess'

// function App() {
//     const isSellerPath = useLocation().pathname.includes("seller")
//     const {showUserLogin , isSeller} = useAppContext();
//     return (
//      <div className='text-default min-h-screen text-gray-700 bg-white'>
//        {isSellerPath ? null : <Navbar/>}
//        {showUserLogin ? <Login/> : null}
//         <Toaster/>
//        <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//          <Routes>
//            <Route path='/' element={<Home/>}/>
//            <Route path='/products' element={<AllProducts/>}/>
//            <Route path='/products/:category' element={<ProductCategory/>}/>
//            <Route path='/products/:category/:id' element={<ProductDetails/>}/>
//            <Route path='/cart' element={<Cart/>}/>
//            <Route path='/add-address' element={<AddAddress/>}/>
//            <Route path='/my-orders' element={<MyOrders/>}/>
//            <Route path='/loader' element={<Loading/>}/>
//            {/* <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
//              <Route index element={isSeller ? <AddProduct/> : null }/>
//              <Route path='product-list' element={<ProductList/>}/>
//              <Route path='orders' element={<Orders/>}/>
//            </Route> */}
//            <Route path="/farmer/login" element={<FarmerLogin />} />
//            <Route path="/farmer/register" element={<FarmerLogin />} />
        
//            <Route path="/paymentSuccess" element={<PaymentSuccess/>}/>
           
//          </Routes>
         
//        </div>
//         {!isSellerPath &&  <Footer/>}
//      </div>
//   )
// }

// export default App
