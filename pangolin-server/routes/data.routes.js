const verifyToken = require("../auth_check/verify_token");
const auth = require("../auth/auth");
const db_manager = require("../db_models/db_manager");

const Pangolin = db_manager.pangolin;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/data/infos", [verifyToken], (req, res) => {
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

          res.status(200).send({
              age: pangolin.age,
              family: pangolin.family,
              race: pangolin.race,
              food: pangolin.food,

          });

        });
  });

  app.update("/api/data/infos", [verifyToken], (req, res) => {
      Pangolin.updateOne({username: req.body.username}, {
          age: req.body.age,
          family: req.body.family,
          race: req.body.race,
          food: req.body.food
      }, (err, docs) => {
          if(err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("Update ", docs);
      });
  
    });
 
  app.get("/api/data/friends", [verifyToken], (req, res) => {

    let pangos = [];
    let friends = [];
      Pangolin.find({}, (err, pangolins) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        pangos = pangolins;
      });

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

          friends = pangolin.friends;
          res.status(200).send({
              pangos: pangos,
              friends: friends
          });
        });
    });

};