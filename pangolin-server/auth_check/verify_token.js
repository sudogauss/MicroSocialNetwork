const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db_manager = require("../db_models/db_manager");


const Pangolin = db_manager.pangolin;


verifyToken = (req, res, next) => {

  console.log(req.headers);

  let token = req.headers.token_header;

  console.log(token);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Nope!!!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
