import express from "express";
const { Router } = express;
import passport from "passport";
import validator from "../../validation/validator.js";
import { reviewValidator } from "../../validation/review.js";
import Restaurant from "../../models/restaurant.js";
import { toOwnerNonRepliedReviewArray } from "../../transformation/toOwnerNonRepliedReviewArray.js";

const reviewsOwnerRouter = Router();

reviewsOwnerRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id: ownerId, type } = req.user;

  if (type !== "owner") return res.status(401).json({ message: "Only owner account can get this restaurant list" });

  try {
    const restaurants = await Restaurant.find({ ownerId });
    res.send(toOwnerNonRepliedReviewArray(restaurants));
  } catch (error) {
    res.status(400).json({ message: "Failed to get reviews" });
  }
});

reviewsOwnerRouter.put("/:reviewerid/restaurant/:restaurantid/reply", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;
  if (type !== "owner") return res.status(401).json({ message: "Only owner account can use this endpoint" });

  const { isValid, errors } = validator(req.body, reviewValidator);
  if (!isValid) return res.status(400).json(errors);

  const { reviewerid, restaurantid } = req.params;

  if (!reviewerid || !restaurantid) return res.status(404).json({ message: "Restaurant and visitor are required" });

  try {
    const restaurant = await Restaurant.findById(restaurantid);
    const { reviews } = restaurant;
    const foundReview = reviews.find((r) => r.reviewerId === reviewerid);
    if (!foundReview) return res.status(404).json({ message: "Review you are trying to reply not found" });
    if (foundReview && foundReview.reply) return res.status(400).json({ message: "You already made reply, not allowed to do it again" });

    const { reply } = req.body;
    await Restaurant.updateOne({ "reviews.reviewerId": reviewerid, _id: restaurantid }, { $set: { "reviews.$.reply": reply } });
    res.send({ message: "Your reply succesfully saved" });
  } catch (error) {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

export { reviewsOwnerRouter };
