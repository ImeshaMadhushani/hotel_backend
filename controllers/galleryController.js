import Gallery from "../models/galleryModel.js"


export function createGallery(req, res) {

    const user = req.user;

    if (user == null) {
       res.status(403).json({ message: "Please  login to create gallery" })
        return; 
    }

    if (user.type != "admin") {
        res.status(403).json({ message: "Only admin can create gallery" })
        return;
    }
    
        const gallery = req.body.item;
        const newGalleryItem = new Gallery(gallery);

        newGalleryItem.save().then(() => {
            res.status(201).json({ message: "Gallery created successfully!" });
        }).catch(() => {
            res.status(500).json({ message: "Gallery Item Creation Failed..!!!"});
        })
        
   
}