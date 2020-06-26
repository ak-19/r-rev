import mongoose from "mongoose";
import User from "./models/user.js";
import { LOCAL_MONGO_SERVER } from "./config/keys.js";
export async function startDatabase() {
  mongoose.set("useCreateIndex", true);
  const mongo_uri = process.env.MONGO_URI || LOCAL_MONGO_SERVER;
  await mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const adminUser = await User.findOne({ email: "admin@admin" });
  if (!adminUser) {
    await new User({ email: "admin@admin", password: "admin", type: "admin" }).save();
  }
}
