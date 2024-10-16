import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: "https://pin.it/3fUynqa8a"
        },

        type: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },

        phone: {
            type: String,
            required: true
        },

        whatsapp: {
            type: String,
            required: true
        },

        disabled: {
            type: Boolean,
            default: false
        },

        emailVerified: {
            type: Boolean,
            required: true,
            default: false
        }

    }
)

const User = mongoose.model("users", userSchema);

export default User;