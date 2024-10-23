import Reservation from "../models/reservation.js";

export const saveReservation = async (req, res) => {
  try {
    const userId = req.userId;
    const { seq, name, category, address, telephone, party_size, date, time } =
      req.body;

    const newReservation = new Reservation({
      user_id: userId,
      seq,
      name,
      category,
      address,
      telephone,
      party_size,
      date,
      time,
    });

    await newReservation.save();

    res.status(201).send("예약 저장에 성공하였습니다.");
  } catch (error) {
    console.error("예약 저장 중 오류 발생", error);
    res.status(500).send("예약 저장에 실패하였습니다.");
  }
};
