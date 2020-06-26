import express from "express";
const { Router } = express;
import passport from "passport";
import Restaurant from "../../models/restaurant.js";
import validator from "../../validation/validator.js";
import { restaurantAdminValidator } from "../../validation/restaurantAdmin.js";
import { toOwnerTypeRestaurantsArray } from "../../transformation/toOwnerTypeRestaurantsArray.js";

const restaurantAdminRouter = Router();

restaurantAdminRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { type } = req.user;

    if (type !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin account can get this restaurant list" });
    }

    try {
      const restaurants = await Restaurant.find({});
      res.send(toOwnerTypeRestaurantsArray(restaurants));
    } catch (error) {
      res.status(400).json({ message: "Failed to get restaurants" });
    }
  }
);

restaurantAdminRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { type: role } = req.user;
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admininistrative account can get this list" });
    }
    const { id } = req.params;

    try {
      await Restaurant.findByIdAndDelete(id);
      res.json({ message: "Restaurant deleted" });
    } catch (error) {
      console.log(JSON.stringify(error));
      res.status(400).json({ message: "Problems deleting Restaurant" });
    }
  }
);

restaurantAdminRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { type: role } = req.user;
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admininistrative account can get this list" });
    }

    const { id } = req.params;
    const { name } = req.body;
    const { isValid, errors } = validator({ name }, restaurantAdminValidator);
    if (isValid) {
      try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
          return res
            .status(404)
            .json({ message: "Trying to update non existin restaurant" });
        }
        restaurant.name = name;
        await restaurant.save();
        res.json({ message: "Restaurant updated" });
      } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).json({ message: "Problems saving Restaurant" });
      }
    } else {
      res.status(400).json(errors);
    }
  }
);

export { restaurantAdminRouter };
