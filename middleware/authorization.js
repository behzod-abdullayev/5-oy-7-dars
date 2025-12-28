const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../utils/custom-error-handler");

const authorization = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        message: "bearer token not found",
      });
    }

    const token = bearerToken.split(" ");

    if (token[0] !== "Bearer") {
      return res.status(401).json({
        message: "Bearer token is required",
      });
    }

    if (!token[1]) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    if (decode.role !== "admin" && decode.role !== "superadmin") {
      return res.status(403).json({
        message: "you are not admin, superadmin",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const authorization2 = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({ message: "bearer token not found" });
    }

    const token = bearerToken.split(" ");

    if (token[0] !== "Bearer") {
      return res.status(401).json({ message: "Bearer token is required" });
    }

    if (!token[1]) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    if (decode.role !== "superadmin") {
      return res.status(403).json({
        message: "you are not superadmin",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
  const authorization3 = (req, res, next) => {
  try {

  const access_token = req.cookies.token_generator
  
  if (!access_token) {
    throw CustomErrorHandler.UnAuthorized("acces token not found")
  }

  const decode = jwt.verify(access_token, process.env.SECRET_KEY)
  req.user = decode

  if(!["superadmin", "admin"].includes(req.user.role)) {
    throw CustomErrorHandler.forbidden("you are not admin or superadmin")
  }

  next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authorization,
  authorization2,
  authorization3
};
