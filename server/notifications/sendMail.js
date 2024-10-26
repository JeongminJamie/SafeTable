import { confirmHTML, transporter } from "../config/nodemailer.js";
import dotenv from "dotenv";
import formatDate from "../utils/formatDate.js";

dotenv.config({ path: ".env.local" });

// 예약 확정 이메일 전송
export const sendConfirmationEmail = async (
  userEmail,
  name,
  category,
  address,
  party_size,
  date,
  time
) => {
  const formattedDate = formatDate(date);
  const mailOptions = {
    from: process.env.NAVER_USER,
    to: userEmail,
    subject: `안심테이블의 ${name} 예약 확정`,
    html: confirmHTML(name, category, address, party_size, formattedDate, time),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("성공적으로 예약 확정 이메일을 전송했습니다" + info.response);
  } catch (error) {
    console.error("예약 확정 이메일 전송 실패", error);
    throw new Error("확정 이메일 전송에 실패했습니다.");
  }
};
