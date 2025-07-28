import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";

const router = Router();

router.get("/",       CategoryController.list);      
router.get("/:slug",  CategoryController.getBySlug);   

export default router;
