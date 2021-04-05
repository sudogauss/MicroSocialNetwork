const db_manager = require("../db_models/db_manager");
const Pangolin = db_manager.pangolin;

checkLoginDuplication = (req, res, next) => {
  Pangolin.findOne({
    username: req.body.username
  }).exec((err, pangolin) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (pangolin) {
      res.status(400).json({ message: "Pangolin already exists" });
      return;
    }
    return;
  });
};

module.exports = checkLoginDuplication;