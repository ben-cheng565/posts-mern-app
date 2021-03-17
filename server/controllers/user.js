import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// user sign in api
export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    // check if this email already exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // verify if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect." });
    }

    // create toke
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "privatekey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// user sign up api
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: user.email, id: user._id }, "privatekey", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
