var expressJwt =require("express-jwt");

// req.user
const requireSignin = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
exports.requireSignin = requireSignin;
