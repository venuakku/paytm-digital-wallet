import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getBalance,
  transferMoney,
} from "../controllers/balanceControllers.js";

const account = express.Router();

account.get("/balance", authMiddleware, getBalance);
account.post("/transfer", authMiddleware, transferMoney);

export default account;
