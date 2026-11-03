
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";


const FarmerDashboard = () => {

    const { axios } = useAppContext();

    const [dashboard, setDashboard] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0,
        pendingOrders: 0,
        recentOrders: [],
        salesOverview: [],
    });

    const [loading, setLoading] = useState(true);


    // =========================
    // Fetch Dashboard Data
    // =========================

    const fetchDashboard = async () => {

        try {

            setLoading(true);

            const { data } = await axios.get(
                "/api/dashboard"
            );

            if (data.success) {

                setDashboard(data.dashboard);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    // =========================
    // Currency Formatter
    // =========================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    };


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div className="flex-1 flex items-center justify-center">

                <p className="text-gray-500">
                    Loading dashboard...
                </p>

            </div>
        );

    }


    return (

        <div className="flex-1 bg-gray-50 min-h-[95vh] p-6 md:p-8">


            {/* =========================
                Header
            ========================= */}

            <div className="mb-6">

                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">

                    Seller Dashboard

                </h1>

                <p className="text-gray-500 mt-1">

                    Overview of your products, orders and sales

                </p>

            </div>



            {/* =========================
                Statistics Cards
            ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">


                {/* Products */}

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500 text-sm">

                        Total Products

                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 mt-2">

                        {dashboard.totalProducts}

                    </h2>

                    <p className="text-sm text-gray-400 mt-2">

                        Products listed

                    </p>

                </div>



                {/* Orders */}

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500 text-sm">

                        Total Orders

                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 mt-2">

                        {dashboard.totalOrders}

                    </h2>

                    <p className="text-sm text-gray-400 mt-2">

                        Orders received

                    </p>

                </div>



                {/* Sales */}

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500 text-sm">

                        Total Sales

                    </p>

                    <h2 className="text-3xl font-semibold text-primary mt-2">

                        {formatCurrency(dashboard.totalSales)}

                    </h2>

                    <p className="text-sm text-gray-400 mt-2">

                        Total revenue

                    </p>

                </div>



                {/* Pending Orders */}

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500 text-sm">

                        Pending Orders

                    </p>

                    <h2 className="text-3xl font-semibold text-orange-500 mt-2">

                        {dashboard.pendingOrders}

                    </h2>

                    <p className="text-sm text-gray-400 mt-2">

                        Need your attention

                    </p>

                </div>

            </div>



            {/* =========================
                Sales Overview
            ========================= */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6 p-5">

                <div className="mb-5">

                    <h2 className="text-xl font-semibold text-gray-800">

                        Sales Overview

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Sales for the last 6 months

                    </p>

                </div>


                <div className="w-full h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={dashboard.salesOverview}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={(value) =>
                                    formatCurrency(value)
                                }
                            />

                            <Bar
                                dataKey="sales"
                                fill="#22c55e"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>



            {/* =========================
                Recent Orders
            ========================= */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6">


                <div className="p-5 border-b border-gray-200">

                    <h2 className="text-xl font-semibold text-gray-800">

                        Recent Orders

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Your latest customer orders

                    </p>

                </div>



                {/* =========================
                    Desktop Table
                ========================= */}

                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="text-left text-sm text-gray-500 border-b">

                                <th className="px-5 py-4">
                                    Order
                                </th>

                                <th className="px-5 py-4">
                                    Customer
                                </th>

                                <th className="px-5 py-4">
                                    Amount
                                </th>

                                <th className="px-5 py-4">
                                    Status
                                </th>

                                <th className="px-5 py-4">
                                    Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {dashboard.recentOrders.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-10 text-gray-500"
                                    >

                                        No orders yet

                                    </td>

                                </tr>

                            ) : (

                                dashboard.recentOrders.map((order) => (

                                    <tr
                                        key={order._id}
                                        className="border-b last:border-b-0 hover:bg-gray-50"
                                    >

                                        {/* Order */}

                                        <td className="px-5 py-4 font-medium text-gray-800">

                                            #
                                            {order._id
                                                .slice(-6)
                                                .toUpperCase()}

                                        </td>


                                        {/* Customer */}

                                        <td className="px-5 py-4">

                                            <p className="font-medium text-gray-800">

                                                {order.consumerId?.name ||
                                                    "Customer"}

                                            </p>

                                            <p className="text-xs text-gray-400">

                                                {order.consumerId?.email ||
                                                    ""}

                                            </p>

                                        </td>


                                        {/* Amount */}

                                        <td className="px-5 py-4 font-medium">

                                            {formatCurrency(
                                                order.amount
                                            )}

                                        </td>


                                        {/* Status */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`
                                                    px-3 py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium

                                                    ${
                                                        order.status ===
                                                        "Order Placed"

                                                            ? "bg-yellow-100 text-yellow-700"

                                                            : order.status ===
                                                              "Delivered"

                                                            ? "bg-green-100 text-green-700"

                                                            : order.status ===
                                                              "Cancelled"

                                                            ? "bg-red-100 text-red-700"

                                                            : "bg-blue-100 text-blue-700"
                                                    }
                                                `}
                                            >

                                                {order.status}

                                            </span>

                                        </td>


                                        {/* Date */}

                                        <td className="px-5 py-4 text-sm text-gray-500">

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>



                {/* =========================
                    Mobile Orders
                ========================= */}

                <div className="md:hidden">

                    {dashboard.recentOrders.length === 0 ? (

                        <div className="text-center py-10 text-gray-500">

                            No orders yet

                        </div>

                    ) : (

                        dashboard.recentOrders.map((order) => (

                            <div
                                key={order._id}
                                className="p-5 border-b last:border-b-0"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <p className="font-medium text-gray-800">

                                            #
                                            {order._id
                                                .slice(-6)
                                                .toUpperCase()}

                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">

                                            {order.consumerId?.name ||
                                                "Customer"}

                                        </p>

                                    </div>


                                    <p className="font-medium">

                                        {formatCurrency(
                                            order.amount
                                        )}

                                    </p>

                                </div>


                                <div className="flex justify-between items-center mt-3">

                                    <span className="text-xs text-gray-400">

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )}

                                    </span>


                                    <span
                                        className={`
                                            px-3 py-1
                                            rounded-full
                                            text-xs

                                            ${
                                                order.status ===
                                                "Order Placed"

                                                    ? "bg-yellow-100 text-yellow-700"

                                                    : order.status ===
                                                      "Delivered"

                                                    ? "bg-green-100 text-green-700"

                                                    : order.status ===
                                                      "Cancelled"

                                                    ? "bg-red-100 text-red-700"

                                                    : "bg-blue-100 text-blue-700"
                                            }
                                        `}
                                    >

                                        {order.status}

                                    </span>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );
};

export default FarmerDashboard;




// const FarmerDashboard = () => {
//   return (
//     <div>FarmerDashboard</div>
//   )
// }

// export default FarmerDashboard