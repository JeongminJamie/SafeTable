import Reservation from "../models/reservation.js";

export const saveReservation = async (req, res) => {
  try {
    const userId = req.userId;
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

    await newReservation.save();

    res.status(201).send("예약 저장에 성공하였습니다.");
  } catch (error) {
    console.error("예약 저장 중 오류 발생", error);
    res.status(500).send("예약 저장에 실패하였습니다.");
  }
};
