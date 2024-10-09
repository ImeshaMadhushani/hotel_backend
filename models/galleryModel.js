import mongoose from "mongoose";

const galleryItem = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    }
)

const Gallery = mongoose.model("Gallery", galleryItem);

export default Gallery;