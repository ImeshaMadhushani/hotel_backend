import Category from "../models/categoryModel.js";
import { isAdminValid } from "./userController.js";
export function createCategory(req, res) {
    const user = req.user;

    if (user == null) {
        return res.status(400).json({ message: "Invalid user data!" });
    }
    
    if (user.type != "admin") { 
        return res.status(403).json({ message: "Only admins can create categories!" });
    } 

    const newCategory = new Category(req.body);
    newCategory.save().then((result) => {
        res.json({
            message: "Category created successfully!",
            result: result
        });
    }).catch((error) => {
        res.status(400).json({ message: error.message });
    });

}

export function deleteCategory(req, res) { 
    const user = req.user;
     if (user == null) {
        return res.status(400).json({ message: "Invalid user data!" });
        return;
    }
    
    
    if (user.type!= "admin") {
        return res.status(403).json({ message: "Only admins can delete categories!" });
        return;
    } 
    

    const { name } = req.params;
    Category.findOneAndDelete({ name }).then((result) => { 
        if (!result) {
            return res.status(404).json({ message: "Category not found!" });
        }
        res.json({ message: "Category deleted successfully!" });
    }).catch({
        message: "Failed to delete category."
    })
}

export function getCategoryByName(req, res) {
    const name = req.params.name;

    Category.findOne({ name: name }).then((category) => {
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        } else {
            res.json({
                category: category
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Failed to fetch category"
        });
    })
} 

export function updateCategory(req, res) {
    const adminValid = isAdminValid(req)

    if (!adminValid) {
        res.status(403).json({
            message: "Unauthorized to update category"
        });
        return;
    }

    const id = req.param.id;

    Category.updateOne({ id: id }, req.body).then(
        () => {
            res.json({
                message: "Category updated successfully"
            });
        }).catch(
            () => {
                res.status(500).json({
                    message: "Failed to update category"
                });
            }
        )
}




export function getCategory(req, res) { 
    Category.find().then((categories) => {
        res.json(categories);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
}
 