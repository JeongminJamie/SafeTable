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
  refreshToken: {
    type: String, // 리프레시 토큰을 문자열로 저장
    default: null, // 기본값을 null로 설정
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
