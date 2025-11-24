import express from "express";
import cors from "cors";
import adminRoutes from "./Server/routes/adminRoutes.js";
import productRoutes from "./Server/routes/productRoutes.js";
import orderRoutes from "./Server/routes/orderRoutes.js";
import paymentRoutes from "./Server/routes/paymentRoutes.js";
import storeRoutes from "./Server/routes/storeRoutes.js";
import categoryRoutes from "./Server/routes/categoryRoutes.js";
import deliveryRoutes from "./Server/routes/deliveryRoutes.js";

const app = express();

// CORS configuration
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/delivery", deliveryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
