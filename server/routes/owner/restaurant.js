import express from "express";
const { Router } = express;
import passport from "passport";
import Restaurant from "../../models/restaurant.js";
import validator from "../../validation/validator.js";
import { restaurantValidator } from "../../validation/restaurant.js";
import { toOwnerTypeRestaurantDetails } from "../../transformation/toOwnerTypeRestaurantDetails.js";
import { toOwnerTypeRestaurantsArray } from "../../transformation/toOwnerTypeRestaurantsArray.js";
const restaurantRouter = Router();

restaurantRouter.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id: ownerId, email, type } = req.user;

  if (type !== "owner") {
    return res.status(401).json({ message: "Only owner account can save restaurant" });
  }

  const { name } = req.body;
  const { isValid, errors } = validator({ name, ownerId }, restaurantValidator);
  if (isValid) {
    try {
      const newRestaurant = await new Restaurant({ name, ownerId }).save();
      res.send("You made new restaurant succesfully");
    } catch (error) {
      res.status(400).json({ message: "Failed to save restaurant" });
    }
  } else {
    res.status(400).json(errors);
  }
});

restaurantRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id: ownerId, type } = req.user;

  if (type !== "owner") {
    return res.status(401).json({ message: "Only owner account can get this restaurant list" });
  }

  try {
    const restaurants = await Restaurant.find({ ownerId });
    res.send(toOwnerTypeRestaurantsArray(restaurants));
  } catch (error) {
    res.status(400).json({ message: "Failed to get restaurants" });
  }
});

restaurantRouter.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;
  if (type !== "owner") {
    return res.status(401).json({ message: "Only owner account can get this restaurant list" });
  }

  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(toOwnerTypeRestaurantDetails(restaurant));
  } catch (error) {
    res.status(400).json(error);
  }
});

export { restaurantRouter };
