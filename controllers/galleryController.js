import Gallery from "../models/galleryModel.js"


export function createGallery(req, res) {

    const user = req.body;

    if (!user) {
        return res.status(403).json({ message: "Please  login to create gallery" });
    } else if (user == 'admin') { 
        const galleryItem = req.body.item;
        const newGalleryItem = new Gallery(galleryItem);

        newGalleryItem.save().then(() => {
            res.status(201).json({ message: "Gallery created successfully!" });
        }).catch((error) => {
            res.status(500).json({ message: "Error creating gallery!", error: error.message });
        })
    } else {
        return res.status(403).json({ message: "You are not authorized to create gallery" });
    }
   
}