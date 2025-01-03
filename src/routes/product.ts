import { createProduct, deleteAllProducts, deleteProductById, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/:id", getProductById);
productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProductById);
productRouter.delete("/", deleteAllProducts);

export default productRouter;