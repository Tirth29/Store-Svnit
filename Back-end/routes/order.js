import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import {
  createOrder,
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  proccessOrder,
  proccessPayment,
} from "../controllers/order.js";
const router = express.Router();

router.post("/new", isAuthenticated, createOrder);
router.post("/payment", isAuthenticated, proccessPayment);
router.get("/my", isAuthenticated, getMyOrders);
router.get("/admin", isAuthenticated,isAdmin ,getAdminOrders);
router
  .route("/single/:id")
  .get(isAuthenticated, getOrderDetails)
  .put(isAuthenticated, isAdmin, proccessOrder );

export default router;
