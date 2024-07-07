import User from "../models/userModel.js";
import { signinBody, signupBody, updateBody } from "../zod/userValidation.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../configs/jwt.js";
import Account from "../models/accountsModel.js";

const signup = async (req, res) => {
  const success = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExist = await User.findOne({
    username: req.body.username,
  });

  if (userExist) {
    return res.status(411).json({
      message: "username already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: `${req.body.firstName} ${req.body.lastName}`,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: Math.random() * 10000 + 1,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
};

const signin = async (req, res) => {
  const success = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
};

const updateUser = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
};

const getUsers = async (req, res) => {
  const filter = req.query.filter || "";
  const currentUserID = req.userId;

  const users = await User.find({
    $and: [
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
          { fullName: { $regex: filter, $options: "i" } },
        ],
      },
      { _id: { $ne: currentUserID } },
    ],
  }).exec();

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

export { signup, signin, updateUser, getUsers };
