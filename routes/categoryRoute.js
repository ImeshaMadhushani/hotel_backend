import express from "express";
import { createCategory , deleteCategory, getCategory , getCategoryByName , updateCategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getCategory);
categoryRouter.get("/:name", getCategoryByName);

categoryRouter.put("/:name", updateCategory);
categoryRouter.delete("/:name", deleteCategory);

export default categoryRouter;