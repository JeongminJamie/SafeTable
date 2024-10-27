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
  card_number: {
    type: String,
  },
  savedRestaurants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", default: [] },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
