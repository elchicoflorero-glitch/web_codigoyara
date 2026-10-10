import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../services/db";

const router = Router();

// POST /api/admin/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Email y contraseña requeridos" });
    return;
  }

  try {
    // Check env credentials first (bootstrap admin)
    const envEmail    = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    let adminId = "env-admin";
    let valid   = false;

    if (email === envEmail && password === envPassword) {
      valid = true;
    } else {
      // Check DB admin
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (admin) {
        valid   = await bcrypt.compare(password, admin.passwordHash);
        adminId = admin.id;
      }
    }

    if (!valid) {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
      return;
    }

    const token = jwt.sign({ adminId }, process.env.JWT_SECRET!, { expiresIn: "12h" });
    res.json({ success: true, token });
  } catch (err) {
    console.error("[admin] login error:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
