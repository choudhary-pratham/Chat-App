const User = require("../models/userModel");

module.exports.registerPost = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ message: "username already exists", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "email already exists", status: false });

    const newUser = await new User({ username, password, email });
    const response = await newUser.save();
    console.log("data saved");
    // res.status(200).json(response);
    return res.json({ status: true, newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.registerGet = async (req, res) => {
  try {
    const data = await User.find();
    // res.send("data");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
