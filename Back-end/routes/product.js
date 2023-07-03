import express from "express";
import { getCategoryProduct } from "../controllers/product.js";
import {
  addCategory,
  addProduct,
  addProductImage,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getAdminProduct,
  getAllCategories,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/all", getAllProduct);
router.get("/getcategory",getCategoryProduct);
router.get("/admin",isAuthenticated, isAdmin, getAdminProduct);
router
  .route("/single/:id")
  .get(getProductDetails)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);
router.post("/new", isAuthenticated, isAdmin, singleUpload, addProduct);
router
  .route("/images/:id")
  .put(isAuthenticated, isAdmin, singleUpload, addProductImage)
  .delete(isAuthenticated, isAdmin, deleteProductImage);

router.post("/category", isAuthenticated, isAdmin, addCategory);
router.get("/categories", getAllCategories);
router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);

export default router;
