import * as productController from "../controllers/productController";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/:id", productController.getProductById);
productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProductById);
productRouter.delete("/", productController.deleteAllProducts);

export default productRouter;