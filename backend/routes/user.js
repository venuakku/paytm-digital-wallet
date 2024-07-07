import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  signin,
  signup,
  updateUser,
  getUsers,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/", authMiddleware, updateUser);
router.get("/bulk", authMiddleware, getUsers);

export default router;
