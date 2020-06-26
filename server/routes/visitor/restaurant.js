import express from "express";
const { Router } = express;
import passport from "passport";
import Restaurant from "../../models/restaurant.js";
import validator from "../../validation/validator.js";
import { reviewVisitorValidator } from "../../validation/reviewVisitor.js";
import { toVisitorTypeRestaurantsArray } from "../../transformation/toVisitorTypeRestaurantsArray.js";
import { toVisitorTypeRestaurant } from "../../transformation/toVisitorTypeRestaurant.js";
const restaurantsVisitorRouter = Router();

restaurantsVisitorRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id, type } = req.user;

  if (type !== "visitor") {
    return res.status(401).json({ message: "Only visitor account can get this restaurant list" });
  }

  try {
    const restaurants = await Restaurant.find({});
    const sortedRestaurants = toVisitorTypeRestaurantsArray(restaurants);
    sortedRestaurants.sort((a, b) => (b.avg || 0) - (a.avg || 0));
    res.send(sortedRestaurants);
  } catch (error) {
    res.status(400).json({ message: "Failed to save restaurant" });
  }
});

restaurantsVisitorRouter.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;
  if (type !== "visitor") {
    return res.status(401).json({ message: "Only visitor account can get this restaurant list" });
  }

  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(toVisitorTypeRestaurant(restaurant));
  } catch (error) {
    res.status(400).json(error);
  }
});

restaurantsVisitorRouter.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id: reviewerId, type, email } = req.user;
  if (type !== "visitor") return res.status(401).json({ message: "Only visitor account can use this endpoint" });

  const { isValid, errors } = validator(req.body, reviewVisitorValidator);
  if (!isValid) return res.status(400).json(errors);

  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Id is required" });

  try {
    const restaurant = await Restaurant.findById(id);
    if (restaurant.reviews.find((r) => r.reviewerId === reviewerId))
      return res.status(400).json({ message: "You already made review, not allowed to do it again" });

    const { comment, rating, visitDate } = req.body;
    restaurant.reviews.push({ comment, rating, reviewerId, name: email, visitDate });
    await restaurant.save();
    res.send(restaurant);
  } catch (error) {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

export { restaurantsVisitorRouter };
