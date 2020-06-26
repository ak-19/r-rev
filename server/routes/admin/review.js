import express from "express";
const { Router } = express;
import passport from "passport";
import Restaurant from "../../models/restaurant.js";
import { toOwnerTypeReviewArray } from "../../transformation/toOwnerTypeReviewArray.js";

const reviewAdminRouter = Router();

reviewAdminRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;

  if (type !== "admin") {
    return res.status(401).json({ message: "Only admin account can get this review list" });
  }

  try {
    const restaurants = await Restaurant.find({});
    res.send(toOwnerTypeReviewArray(restaurants));
  } catch (error) {
    res.status(400).json({ message: "Failed to get reviews" });
  }
});

reviewAdminRouter.delete("/:reviewerid/restaurant/:restaurantid", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    return res.status(401).json({
      message: "Only admin account can use this endpoint",
    });
  }
  const { reviewerid, restaurantid } = req.params;

  if (reviewerid && restaurantid) {
    try {
      const restaurant = await Restaurant.findById(restaurantid);
      const { reviews } = restaurant;
      const newReviews = reviews.filter((r) => r.reviewerId !== reviewerid);
      restaurant.reviews = newReviews;
      await restaurant.save();
      res.send({ message: "Review succesfully deleted" });
    } catch (error) {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } else {
    res.status(404).json({ message: "Restaurant and visitor are required" });
  }
});

reviewAdminRouter.put("/:reviewerid/restaurant/:restaurantid", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    return res.status(401).json({
      message: "Only admin account can use this endpoint",
    });
  }
  const { reviewerid, restaurantid } = req.params;

  if (reviewerid && restaurantid) {
    try {
      const restaurant = await Restaurant.findById(restaurantid);
      const { comment, reply, rating } = req.body;
      const { reviews } = restaurant;
      const foundReview = reviews.find((r) => r.reviewerId === reviewerid);
      if (foundReview) {
        foundReview.comment = comment;
        foundReview.reply = reply;
        foundReview.rating = rating;
        await Restaurant.updateOne(
          {
            "reviews.reviewerId": reviewerid,
            _id: restaurantid,
          },
          {
            $set: {
              "reviews.$.reply": reply,
              "reviews.$.comment": comment,
              "reviews.$.rating": rating,
            },
          }
        );
        res.send({ message: "Review succesfully updated" });
      } else {
        res.status(404).send({ message: "Review not found" });
      }
    } catch (error) {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } else {
    res.status(404).json({ message: "Restaurant and visitor are required" });
  }
});

export { reviewAdminRouter };
