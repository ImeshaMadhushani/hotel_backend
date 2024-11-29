import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        price: {
            type: Number,
            required: true
        },

        features: [
            {
                type: String,
            }
        ],

        description: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: "" // Default value for image if not provided

        }

    }    
)

const Category = mongoose.model("category", categorySchema);

export default Category;