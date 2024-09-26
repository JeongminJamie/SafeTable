import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com", // 네이버 SMTP 서버 주소
  port: 587, // SMTP 포트 (TLS)
  secure: false, // true로 설정하면 SSL 사용, false로 설정하면 TLS 사용
  auth: {
    user: process.env.EMAIL_USER, // 네이버 이메일 주소
    pass: process.env.EMAIL_PASS, // 네이버 이메일 비밀번호
  },
});

const sendVerificationEmail = (userEmail, token) => {
  const verificationUrl = `http://yourdomain.com/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};
