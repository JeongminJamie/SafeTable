import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.NAVER_USER,
    pass: process.env.NAVER_PASS,
  },
  host: "smtp.naver.com",
  port: 465, // SSL 포트
  secure: true,
});

export const confirmHTML = (name, category, address, partySize, date, time) => {
  return `<!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        }
        h1 {
          color: #333;
        }
        h3 {
          color: #555;
          font-weight: normal;
        }
        p {
          color: #666;
          line-height: 1.5;
        }
        .highlight {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffeb3b;
          padding: 10px;
          border-radius: 4px;
        }
        .footer {
          margin-top: 20px;
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="highlight">${name} 예약이 확정되었습니다!</div>
          <h1>${name}</h1>
          <h3>${category}</h3>
        <p><strong>주소:</strong> ${address}</p>
        <p><strong>인원:</strong> ${partySize}</p>
        <p><strong>날짜:</strong> ${date}</p>
        <p><strong>시간:</strong> ${time}</p>
      </div>
      <div class="footer">
        <p>안심테이블을 이용해 주셔서 감사합니다.</p>
      </div>
    </body>
  </html>`;
};
