import Category from "../models/categoryModel.js";

export function createCategory(req, res) {
    const user = req.body;

    if (user == null) {
        return res.status(400).json({ message: "Invalid user data!" });
    }
    
    if (user.type != "admin") { 
        return res.status(403).json({ message: "Only admins can create categories!" });
    } 

    const categories = req.body.item;
    const newCategory = Category(categories);
    newCategory.save().then(() => {
        res.status(201).json({message: "Category created successfully!" });
    }).catch((error) => {
        res.status(400).json({ message: error.message });
    });

}


export function getCategory(req, res) { 
    Category.find().then((categories) => {
        res.json(categories);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
}
