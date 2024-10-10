import express from 'express';
import { createGallery , getGalleryItem } from "../controllers/galleryController.js";

const galleryRouter = express.Router();

galleryRouter.post('/', createGallery);
galleryRouter.get("/", getGalleryItem);


export default galleryRouter;