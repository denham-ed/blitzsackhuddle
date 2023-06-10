const jwt = require("jsonwebtoken");
const Player = require("../models/userModel");
const Organisation = require("../models/organisationModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        req.organisation = await Organisation.findById(req.user.organisation);
        next();
      } catch (error) {
        res.status(401).json({ error: "Not authorized, token failed" });
      }
    } else {
      res.status(401).json({ error: "Not authorized, invalid token format" });
    }
    
    if (!token) {
      res.status(401).json({ error: "Not authorized, no token" });
    }
  });


  module.exports = { protect };