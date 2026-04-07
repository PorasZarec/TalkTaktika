import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const router = Router();

// TEMP ROUTE
router.post("/seed", async (req: Request, res: Response): Promise<any> => {
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Users already exist. Seeding disabled." });
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    const newAdmin = await User.create({
      email: "admin@talktaktika.ph",
      password: hashedPassword,
      role: "SUPERADMIN"
    });

    return res.status(201).json({
      message: "anjing admin created",
      email: newAdmin.email,
      password: "password123"
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during seeding" });
  }
});

// LOGIN ROUTE
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

export default router;