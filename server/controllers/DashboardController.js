

import Product from "../models/Product.js";
import Order from "../models/Order.js";


// ==========================
// Farmer Dashboard
// ==========================
export const getFarmerDashboard = async (req, res) => {
    try {
        const farmerId = req.user.id;

        // 1. Total Products
        const totalProducts = await Product.countDocuments({
            farmerId
        });

        // 2. Get Farmer Orders
        const orders = await Order.find({
            farmerId,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        })
            .populate("consumerId", "name email")
            .populate("items.product", "name offerPrice")
            .sort({ createdAt: -1 });

        // 3. Total Orders
        const totalOrders = orders.length;

        // 4. Total Sales
        const totalSales = orders.reduce(
            (total, order) => total + order.amount,
            0
        );

        // 5. Pending Orders
        const pendingOrders = orders.filter(
            order => order.status === "Order Placed"
        ).length;

        // 6. Recent Orders
        const recentOrders = orders.slice(0, 5);

        // 7. Sales Overview - Last 6 Months
        const salesOverview = [];

        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );

            const month = date.toLocaleString("default", {
                month: "short"
            });

            const year = date.getFullYear();
            const monthIndex = date.getMonth();

            const monthlySales = orders
                .filter(order => {
                    const orderDate = new Date(order.createdAt);

                    return (
                        orderDate.getMonth() === monthIndex &&
                        orderDate.getFullYear() === year
                    );
                })
                .reduce(
                    (total, order) => total + order.amount,
                    0
                );

            salesOverview.push({
                month,
                sales: monthlySales
            });
        }

        return res.status(200).json({
            success: true,
            dashboard: {
                totalProducts,
                totalOrders,
                totalSales,
                pendingOrders,
                recentOrders,
                salesOverview
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};