// import mongoose from "mongoose";
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   // password2: {
//   //   type: String,
//   //   required: true,
//   // },
//   contact: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model("user", UserSchema);

// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 이메일은 중복되면 안 되므로 unique로 설정
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false, // 이메일 인증 여부
  },
  verificationCode: {
    type: String, // 인증 코드 저장
  },
  verificationCodeExpires: {
    type: Date, // 인증 코드 만료 시간 저장
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
