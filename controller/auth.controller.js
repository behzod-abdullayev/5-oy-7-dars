const User = require("../schema/auth.schema");
const bcrypt = require("bcryptjs");
const sendMessage = require("../utils/email.sender");
const CustomErrorHandler = require("../utils/custom-error-handler");
const { tokenGenerator, refreshToken } = require("../utils/token-generator");

// register
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "email, password and username are required",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw CustomErrorHandler.UnAuthorized("use already exist");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(401).json({
        message: "username already exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.ceil(Math.random() * 9)
    ).join("");

    const time = Date.now() + 1000 * 120;

    await User.create({
      username,
      email,
      password: hash,
      otp: generatedCode,
      otpTime: time,
    });
    await sendMessage(email, generatedCode);

    res.status(201).json({
      message: "registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// verify

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      throw CustomErrorHandler.UnAuthorized("user not found");
    }

    const time = Date.now();
    if (foundUser.otpTime < time) {
      throw CustomErrorHandler.BadRequest("otp time expired");
    }

    if (foundUser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("wrong otp");
    }

    await User.findByIdAndUpdate(foundUser._id, {
      isVerified: true,
      otpTime: null,
      otp: null,
    });

    const payload = {
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      id: foundUser.id,
    };
    const token_Generator = tokenGenerator(payload);
    const refresh_token = refreshToken(payload);

    res.cookie("token_generator", token_Generator, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    res.status(200).json({
      message: "success",
      token_Generator,
    });
  } catch (error) {
    next(error);
  }
};

// login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw CustomErrorHandler.UnAuthorized("user not found");
    }

    const compare = await bcrypt.compare(password, foundUser.password);
    if (compare && foundUser.isVerified) {
      const payload = {
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        id: foundUser.id,
      };
      const token_Generator = tokenGenerator(payload);
      const refresh_token = refreshToken(payload);

      res.cookie("token_generator", token_Generator, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 15,
      });

      res.status(200).json({
        message: "success",
        token_Generator,
      });
    } else {
      throw CustomErrorHandler.UnAuthorized("invalid password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verify,
};
