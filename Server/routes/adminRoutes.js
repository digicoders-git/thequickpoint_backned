import express from "express";
import { 
  loginAdmin, 
  createAdmin, 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  getDashboardStats,
  changePassword,
  getRecentActivities,
  getChartData,
  globalSearch 
} from "../controllers/adminController.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

// Auth routes
router.post("/login", loginAdmin);
router.post("/register", createAdmin);

// Protected routes
router.get("/dashboard/stats", authenticateToken, getDashboardStats);
router.get("/recent-activities", authenticateToken, getRecentActivities);
router.get("/chart-data", authenticateToken, getChartData);
router.get("/users", authenticateToken, getUsers);
router.post("/users", authenticateToken, createUser);
router.put("/users/:id", authenticateToken, updateUser);
router.delete("/users/:id", authenticateToken, deleteUser);
router.put("/change-password", authenticateToken, changePassword);
router.get("/search", authenticateToken, globalSearch);

export default router;
