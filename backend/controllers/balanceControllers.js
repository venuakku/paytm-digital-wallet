import mongoose from "mongoose";
import Account from "../models/accountsModel.js";
import User from "../models/userModel.js";

const getBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account) {
    res.status(200).json({
      balance: account.balance,
    });
    return;
  }

  res.status(404).json({
    message: "Error while getting balance",
  });
};

const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
};

export { getBalance, transferMoney };
