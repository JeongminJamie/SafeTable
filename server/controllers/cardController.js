import User from "../models/user.js";

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
