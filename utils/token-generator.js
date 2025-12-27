const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("./custom-error-handler");

const tokenGenerator = (payload) => {
try {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
} catch (error) {
  throw CustomErrorHandler.BadRequest(error.message)
}
};

const refreshToken = (payload) => {
try {
  return jwt.sign(payload, process.env.REFRESH_KEY, {
    expiresIn: "15d",
  });
} catch (error) {
  throw CustomErrorHandler.BadRequest(error.message)
}
};

module.exports = {
  tokenGenerator,
  refreshToken
}