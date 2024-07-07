import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
