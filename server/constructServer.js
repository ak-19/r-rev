import bodyParser from "body-parser";
import passport from "passport";

async function setupRoutes(app) {
  const { userRouter } = await import("./routes/user.js");
  const { restaurantRouter } = await import("./routes/owner/restaurant.js");
  const { restaurantsVisitorRouter } = await import("./routes/visitor/restaurant.js");
  const { reviewsOwnerRouter } = await import("./routes/owner/review.js");
  const { userAdminRouter } = await import("./routes/admin/user.js");
  const { restaurantAdminRouter } = await import("./routes/admin/restaurant.js");
  const { reviewAdminRouter } = await import("./routes/admin/review.js");
  app.use("/api/user", userRouter);
  app.use("/api/owner/restaurants", restaurantRouter);
  app.use("/api/visitor/restaurants", restaurantsVisitorRouter);
  app.use("/api/owner/reviews", reviewsOwnerRouter);
  app.use("/api/admin/users", userAdminRouter);
  app.use("/api/admin/restaurants", restaurantAdminRouter);
  app.use("/api/admin/reviews", reviewAdminRouter);
}

async function setupPassport(app) {
  const { configPassport } = await import("./config/passport.js");
  app.use(passport.initialize());
  configPassport(passport);
}

async function makeExpressApp(express) {
  const app = express();
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  return app;
}

export { makeExpressApp, setupRoutes, setupPassport };
