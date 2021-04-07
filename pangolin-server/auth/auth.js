const auth_config = require("../config/auth.config");
const db_manager = require("../db_models/db_manager");

const Pangolin = db_manager.pangolin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function signup(username, password) {
  const pangolin = new Pangolin({
    username: username,
    password: bcrypt.hashSync(password)
  });


  return await pangolin.save();
};

let signin = (req, res) => {
  Pangolin.findOne({
    username: req.body.username
  })
    .exec((err, pangolin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!pangolin) {
        return res.status(404).send({ message: " Pangolin not found" });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        pangolin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mauvais passgolin?"
        });
      }

      let token = jwt.sign({ id: pangolin.id }, auth_config.secret, {
        expiresIn: 3600
      });

      res.status(200).send({
        id: pangolin.id,
        username: pangolin.username,
        accessToken: token
      });
    });
};

module.exports = {
  signin,
  signup
}
