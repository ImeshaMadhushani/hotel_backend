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

    newGalleryItem.save().then((result) => {
        res.status(201).json({ message: "Gallery item created successfully!", result:result });
    }).catch((err) => { 
        res.status(500).json({ message: "Failed to create gallery item.", error: err.message });
     });
    
        
   
}
 
export function getGalleryItem(req, res) {
    Gallery.find()
        .then((list) => {
            res.json({
                list: list
            });
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to retrieve gallery items." });
        });
} 

