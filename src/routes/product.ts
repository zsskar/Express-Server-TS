import { getAllProducts, getProductById } from "../controllers/productController";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/",getAllProducts);
productRouter.get("/:id",getProductById);

export default productRouter;