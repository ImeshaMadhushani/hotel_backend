import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        roomtype: {
            type: String,
            required: true,
            enum: ['Standard', 'Deluxe', 'Luxury']
        }
    }    
)

const Category = mongoose.model("Category", categorySchema);

export default Category;