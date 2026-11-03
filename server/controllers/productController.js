
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);

        const images = req.files || [];

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "auto",
                });

                return result.secure_url;
            })
        );

        const product = await Product.create({
            ...productData,
            image: imagesUrl,
            farmerId: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Products (Consumer)
export const productList = async (req, res) => {
    try {
        const products = await Product.find({ inStock: true })
            .populate("farmerId", "name email");

        return res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// Get Logged-in Farmer Products
export const myProducts = async (req, res) => {
    try {
        const products = await Product.find({
            farmerId: req.user.id,
        }).sort({ createdAt: -1 });

        return res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// Get Product By Id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Product.findById(id).populate(
            "farmerId",
            "name email"
        );

        if (!product) {
            return res.json({
                success: false,
                message: "Product Not Found",
            });
        }

        return res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, description, category, price, offerPrice } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            {
                _id: id,
                farmerId: req.user.id,
            },
            {
                name,
                description,
                category,
                price,
                offerPrice,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found or Unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({
            _id: id,
            farmerId: req.user.id,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found or Unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Change Product Stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        const product = await Product.findOneAndUpdate(
            {
                _id: id,
                farmerId: req.user.id,
            },
            {
                inStock,
            },
            {
                new: true,
            }
        );

        if (!product) {
            return res.json({
                success: false,
                message: "Product Not Found or Unauthorized",
            });
        }

        return res.json({
            success: true,
            message: "Stock Updated Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};





