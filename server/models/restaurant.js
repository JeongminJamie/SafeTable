import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  clicked: { type: Boolean, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
