const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

userModel.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Override the plain password with the hashed one
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userModel);
module.exports = User;
