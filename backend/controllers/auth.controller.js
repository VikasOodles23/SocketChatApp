import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    await generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { userName, password, confirmPassword, gender, fullName } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password didn't matched",
      });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({
        error: "User already exist",
      });
    }

    const boyProfilePicc = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePicc = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePicc : girlProfilePicc,
    });

    if (newUser) {
      // generate JWT token

      await newUser.save();
      await generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out succesfully",
    });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
