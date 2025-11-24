import mongoose from "mongoose";
import Admin from "../Server/models/Admin.js";
import { connectDB } from "../config/db.js";

const fixLogin = async () => {
  try {
    console.log("🔧 Fixing login issues...");
    
    // Connect to database
    await connectDB();
    console.log(" Database connected");
    
    // Remove existing admin if any
    await Admin.deleteMany({ email: "admin@admin.com" });
    console.log(" Cleared existing admin");
    
    // Create fresh admin
    const admin = new Admin({
      name: "Admin",
      email: "admin@admin.com",
      password: "admin123"
    });
    
    await admin.save();
    console.log(" Fresh admin created");
    
    // Verify admin
    const savedAdmin = await Admin.findOne({ email: "admin@admin.com" });
    if (savedAdmin) {
      // console.log(" Admin verification: SUCCESS");
      // console.log("📧 Email:", savedAdmin.email);
      // console.log("👤 Name:", savedAdmin.name);
      // console.log("🔑 Password: admin123");
      // console.log("");
      // console.log("🎉 Login should now work!");
      // console.log("🌐 Frontend: http://localhost:5173");
      // console.log("🔗 Backend: http://localhost:5000");
    } else {
      // console.log("❌ Admin verification: FAILED");
    }
    
  } catch (error) {
    // console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixLogin();