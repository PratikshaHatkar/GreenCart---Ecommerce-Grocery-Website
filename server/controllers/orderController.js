
import Product from "../models/Product.js";
import Order from "../models/Order.js";




// Place Order - Razorpay

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, address } = req.body;

        const consumerId = req.user.id;

        if (!address || !items || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid order data",
            });
        }

        let amount = 0;
        let farmerId = null;

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.json({
                    success: false,
                    message: "Product not found",
                });
            }

            amount += product.offerPrice * item.quantity;

            // Assumes all products belong to one farmer
            if (!farmerId) {
                farmerId = product.farmerId;
            }
        }

        // 2% Tax
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            consumerId,
            farmerId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false,
        });

        return res.json({
            success: true,
            amount,
            orderId: order._id,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Place Order - COD
// ==========================
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;

        const consumerId = req.user.id;

        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid data",
            });
        }

        let amount = 0;
        let farmerId = null;

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.json({
                    success: false,
                    message: "Product not found",
                });
            }

            amount += product.offerPrice * item.quantity;

            if (!farmerId) {
                farmerId = product.farmerId;
            }
        }

        // 2% Tax
        amount += Math.floor(amount * 0.02);

        await Order.create({
            consumerId,
            farmerId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({
            success: true,
            message: "Order Placed Successfully",
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Consumer Orders
// ==========================
export const getUserOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            consumerId: req.user.id,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Farmer Orders
// ==========================
export const getFarmerOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            farmerId: req.user.id,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        })
            .populate("consumerId", "name email phone")
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Admin Orders
// ==========================
export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        })
            .populate("consumerId", "name email")
            .populate("farmerId", "name email")
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

