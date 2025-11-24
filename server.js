import app from "./app.js";
import { connectDB } from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
console.log(PORT)

connectDB().then(() => {
  console.log('✅ Database connected successfully');
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
  console.log('⚠️ Server will continue without database');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
