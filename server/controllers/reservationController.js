import Reservation from "../models/reservation.js";
import { sendConfirmationEmail } from "../notifications/sendMail.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const saveReservation = async (req, res) => {
  try {
    const userId = req.userId;
    const userEmail = req.userEmail;

    const { seq, name, category, address, telephone, party_size, date, time } =
      req.body;

    // 클라이언트와의 타임존이 9시간(한국) 차이가 나기 때문에 더해주기
    const reserveDate = new Date(date);
    reserveDate.setHours(reserveDate.getHours() + 9);

    const newReservation = new Reservation({
      user_id: userId,
      seq,
      name,
      category,
      address,
      telephone,
      party_size,
      date: reserveDate,
      time,
    });

    console.log("reserveDate 형식 확인", reserveDate);

    await newReservation.save();
    await sendConfirmationEmail(
      userEmail,
      name,
      category,
      address,
      party_size,
      reserveDate,
      time
    );
    res.status(201).send("예약 저장 및 확정 메일 전송에 성공하였습니다.");
  } catch (error) {
    console.error("예약 처리 중 오류 발생", error);
    res.status(500).send("예약 저장 또는 확정 메일 전송에 실패하였습니다.");
  }
};
