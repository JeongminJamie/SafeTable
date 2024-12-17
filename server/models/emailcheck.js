import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true },
  verificationCodeExpires: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
});

const Email = mongoose.model("userEmail", userSchema);

export default Email;
