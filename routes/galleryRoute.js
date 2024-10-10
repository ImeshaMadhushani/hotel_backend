import express from 'express';
import { createGallery } from "../controllers/galleryController.js";

const galleryRouter = express.Router();

galleryRouter.post('/', createGallery);


export default galleryRouter;