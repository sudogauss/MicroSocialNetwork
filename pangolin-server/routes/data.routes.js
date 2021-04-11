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
      console.log(req.query.username);
      Pangolin.findOne({
        username: req.query.username
      })
        .exec((err, pangolin) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!pangolin) {
            return res.json({ message: " Pangolin not found" });
          }

          res.status(200).send({
              age: pangolin.age,
              family: pangolin.family,
              race: pangolin.race,
              food: pangolin.food,

          });

        });
  });

  app.put("/api/data/infos", [verifyToken], (req, res) => {
    console.log(req);
      Pangolin.updateOne({username: req.query.username}, {
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
      res.status(200).send({message: "Ok"});
    });
 
  app.get("/api/data/friends", [verifyToken], (req, res) => {

    let pangos = [];
    let friends = [];
      Pangolin.find({}, (err, pangolins) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        pangos = pangolins.map(pangolin => pangolin.username);
      });

      Pangolin.findOne({
        username: req.query.username
      })
        .exec((err, pangolin) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!pangolin) {
            return res.send({ message: " Pangolin not found" });
          }

          friends = pangolin.friends;
          let pangosNotFriends = pangos.filter(pangoName => !(friends.includes(pangoName) || pangoName === req.query.username));
          res.status(200).send({
              pangos: pangosNotFriends,
              friends: friends
          });
        });
    });

    app.put("/api/data/friends", [verifyToken], (req, res) => {
        Pangolin.updateOne({username: req.query.username}, {
            $addToSet : {friends : [req.body.friendUserName]}
            }, (err, docs) => {
                if(err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                console.log("Update ", docs);
                res.status(200).send({message: "Ok"});
            });
    });

    app.delete("/api/data/friends", [verifyToken], (req, res) => {
        Pangolin.findOneAndUpdate({username : req.query.username}, {
          $pull : {friends : req.query.friendUserName}
        }, (err, docs) => {
            if(err) {
              res.status(500).send({ message: err });
              return;
            }
            console.log("Update ", docs);
            res.status(200).send({message: "Ok"});
        });

    });

};