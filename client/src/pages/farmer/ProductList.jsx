import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {

    const {
        products,
        currency,
        axios,
        fetchMyProducts
    } = useAppContext();

    const navigate = useNavigate();


    // ===========================
    // Fetch Farmer Products
    // ===========================

    useEffect(() => {
        fetchMyProducts();
    }, []);


    // ===========================
    // Toggle Stock
    // ===========================

    const toggleStock = async (id, inStock) => {
        try {

            const { data } = await axios.post(
                "/api/product/stock",
                {
                    id,
                    inStock
                }
            );

            if (data.success) {

                fetchMyProducts();

                toast.success(data.message);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }
    };


    // ===========================
    // Delete Product
    // ===========================

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const { data } = await axios.delete(
                `/api/product/delete/${id}`
            );

            if (data.success) {

                toast.success(data.message);

                fetchMyProducts();

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }
    };


    // ===========================
    // Edit Product
    // ===========================

    const editProduct = (id) => {

        navigate(`/farmer/edit-product/${id}`);

    };


    return (

        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">

            <div className="w-full md:p-10 p-4">

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">My Products</h1>


                <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">

                    <table className="md:table-auto table-fixed w-full overflow-hidden">

                        <thead className="text-gray-900 text-sm text-left">

                            <tr>

                                <th className="px-4 py-3 font-semibold truncate">
                                    Product
                                </th>

                                <th className="px-4 py-3 font-semibold truncate">
                                    Category
                                </th>

                                <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">
                                    Selling Price
                                </th>

                                <th className="px-4 py-3 font-semibold truncate">
                                    In Stock
                                </th>

                                <th className="px-4 py-3 font-semibold truncate">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody className="text-sm text-gray-500">

                            {products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="border-t border-gray-500/20"
                                >

                                    {/* Product */}

                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">

                                        <div className="border border-gray-300 rounded overflow-hidden">

                                            <img
                                                src={product.image[0]}
                                                alt="Product"
                                                className="w-16"
                                            />

                                        </div>

                                        <span className="truncate max-sm:hidden w-full">
                                            {product.name}
                                        </span>

                                    </td>


                                    {/* Category */}

                                    <td className="px-4 py-3">
                                        {product.category}
                                    </td>


                                    {/* Price */}

                                    <td className="px-4 py-3 max-sm:hidden">
                                        {currency}
                                        {product.offerPrice}
                                    </td>


                                    {/* Stock */}

                                    <td className="px-4 py-3">

                                        <label className="relative inline-flex items-center cursor-pointer">

                                            <input
                                                onChange={() =>
                                                    toggleStock(
                                                        product._id,
                                                        !product.inStock
                                                    )
                                                }
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={product.inStock}
                                                readOnly
                                            />

                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200">
                                            </div>

                                            <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5">
                                            </span>

                                        </label>

                                    </td>


                                    {/* Actions */}

                                    <td className="px-4 py-3">

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    editProduct(product._id)
                                                }
                                                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    deleteProduct(product._id)
                                                }
                                                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
};

export default ProductList;







// import React from 'react'
// import toast from 'react-hot-toast';
// import { useAppContext } from '../../context/AppContext'
// import {useEffect} from 'react'

// const ProductList = () => {
//     const {products , currency , axios , fetchMyProducts} = useAppContext();

//     const toggleStock = async (id , inStock)=>{
//         try{
//             const {data} = await axios.post('/api/product/stock' , {id , inStock})
//             if(data.success){
//                 fetchMyProducts();
//                 toast.success(data.message)
//             }
//             else{
//                 toast.error(data.message)
//             }
//         } catch(error){
//             toast.error(error.message)
//         }
//     }

//     useEffect(() => {
//         fetchMyProducts();
//     }, []);


//   return (

//             <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col
//             justify-between">
//                 <div className="w-full md:p-10 p-4">
//                     <h2 className="pb-4 text-lg font-medium">All Products</h2>
//                     <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//                         <table className="md:table-auto table-fixed w-full overflow-hidden">
//                             <thead className="text-gray-900 text-sm text-left">
//                                 <tr>
//                                     <th className="px-4 py-3 font-semibold truncate">Product</th>
//                                     <th className="px-4 py-3 font-semibold truncate">Category</th>
//                                     <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
//                                     <th className="px-4 py-3 font-semibold truncate">In Stock</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="text-sm text-gray-500">
//                                 {products.map((product) => (
//                                     <tr key={product._id} className="border-t border-gray-500/20">
//                                         <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                                             <div className="border border-gray-300 rounded overflow-hidden">
//                                                 <img src={product.image[0]} alt="Product" className="w-16" />
//                                             </div>
//                                             <span className="truncate max-sm:hidden w-full">{product.name}</span>
//                                         </td>
//                                         <td className="px-4 py-3">{product.category}</td>
//                                         <td className="px-4 py-3 max-sm:hidden">{currency}{product.offerPrice}</td>
//                                         <td className="px-4 py-3">
//                                             <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
//                                                 <input onClick={()=>toggleStock(product._id , !product.inStock)}  type="checkbox" className="sr-only peer" defaultChecked={product.inStock} />
//                                                 <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
//                                                 <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
//                                             </label>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//   )
// }

// export default ProductList