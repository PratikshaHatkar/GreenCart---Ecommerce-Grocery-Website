import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ["consumer", "farmer", "admin"],
        default: "consumer"
    },

    cartItems: {
        type: Object,
        default: {}
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    minimize: false,
    timestamps: true
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;

