import mongoose from "mongoose";
const CardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  card_company: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("card", CardSchema);

export default Card;
