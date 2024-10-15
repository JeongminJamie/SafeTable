import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  // refreshToken: {
  //   type: String,
  //   default: null,
  // },
});

const User = mongoose.model("user", UserSchema);

export default User;
