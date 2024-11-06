import Card from "../models/Card.js";

export const getMyCard = async (req, res) => {
  const userId = req.userId;

  try {
    const card = await Card.find({ user_id: userId }).select("-user_id");

    return res.status(200).json({
      message: "해당 사용자의 카드 번호 조회",
      card,
    });
  } catch (error) {
    console.error("해당 사용자 카드 번호 조회 중 오류 발생", error);
    return res.status(500).send("카드 번호 조회 중 오류 발생했습니다.");
  }
};

export const saveCard = async (req, res) => {
  const userId = req.userId;
  const { cardCompany, cardNumber } = req.body;

  try {
    const newCard = new Card({
      user_id: userId,
      card_company: cardCompany,
      card_number: cardNumber,
    });

    const savedCard = await newCard.save();

    const { user_id, ...cardWithoutUserId } = savedCard.toObject();

    return res.status(200).json({
      message: "성공적으로 카드를 저장했습니다.",
      savedCard: cardWithoutUserId,
    });
  } catch (error) {
    console.log("카드 저장 중 에러 발생", error);
    return res.status(500).send("카드 저장 중에 에러가 발생했습니다.");
  }
};

export const deleteCard = async (req, res) => {
  const userId = req.userId;
  const { cardId } = req.params;

  try {
    const existCardForUserId = await Card.findOne({ user_id: userId });

    if (!existCardForUserId) {
      return res.status(404).send("해당 사용자의 저장된 카드가 없습니다.");
    }

    if (existCardForUserId._id.toString() === cardId) {
      await Card.deleteOne({ _id: cardId });

      return res.status(200).json({
        message: "해당 사용자의 카드가 성공적으로 삭제되었습니다.",
      });
    } else {
      return res.status(404).send("해당 카드가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("카드 삭제 중 오류 발생", error);
    return res.status(500).send("카드 삭제 중 에러가 발생했습니다.");
  }
};
