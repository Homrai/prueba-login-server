import { Router } from "express";
import { Login, SignUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup",SignUp);
router.post("/login",Login);

export default router;