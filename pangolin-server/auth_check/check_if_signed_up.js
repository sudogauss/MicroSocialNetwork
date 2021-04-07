const db_manager = require("../db_models/db_manager");
const Pangolin = db_manager.pangolin;

module.exports = function(username) {
  Pangolin.findOne({
    username: username
  }).exec((err, pangolin) => {
    if (err) {
      console.log("Fuck")
      return 500;
    }

    if (pangolin) {
      return 400;
    }
    console.log("!");
    return 200;
  });
};
