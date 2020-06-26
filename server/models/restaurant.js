import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  reviews: { type: Array, default: [] },
});

RestaurantSchema.statics.findByIdAndName = function (id, name) {
  return new Promise((resolve, reject) => {
    this.findOne({ id: _id, name })
      .then((restaurant) => {
        console.log(restaurant);
      })
      .catch((err) => {
        reject({ msg: `restaurant not found` });
      });
  });
};

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
