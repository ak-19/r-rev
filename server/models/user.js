import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String },
  data: { type: Date, default: Date.now },
});

UserSchema.statics.findByEmailAndPassword = function (email, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ email })
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          resolve(user);
        } else {
          reject({ msg: `User password didn't match` });
        }
      })
      .catch((err) => {
        reject({ msg: `User not found` });
      });
  });
};

UserSchema.statics.encryptPassword = function (password) {
  return bcrypt.hashSync(password);
};

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
