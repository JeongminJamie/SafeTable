import User from "../models/user.js";

export const getCardNumber = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
    }

    if (!user.card_number) {
      return res.status(204).send("해당 사용자의 카드 번호가 없습니다.");
    }

    return res.status(200).json({
      message: "해당 사용자의 카드 번호 조회 성공",
      last_number: user.card_number.slice(-4),
    });
  } catch (error) {
    console.error("해당 사용자 카드 번호 조회 중 오류 발생", error);
    return res.status(500).send("카드 번호 조회 중 오류 발생했습니다.");
  }
};

export const saveCardNumber = async (req, res) => {
  const userId = req.userId;
  const { cardNumber } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        card_number: cardNumber,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
    }

    return res.status(200).json({
      message: "성공적으로 카드 번호를 저장했습니다.",
      last_number: user.card_number.slice(-4),
    });
  } catch (error) {
    console.log("카드 번호 저장 중 에러 발생", error);
    res.status(500).send("카드 번호 저장 중에 에러가 발생했습니다.");
  }
};
