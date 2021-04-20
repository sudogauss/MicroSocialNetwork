//const checkLoginDuplication = require("../auth_check/check_if_signed_up");
const auth = require("../auth/auth");
const db_manager = require('../db_models/db_manager');

Pangolin = db_manager.pangolin;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  async function checkLoginDuplication(username) {
    return await Pangolin.findOne({username: username});
  }
  

  app.post( "/api/auth/signup", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      checkLoginDuplication(username)
      .then(result => {
        if(result === null) {
          auth.signup(username, password)
          .then(result => {
            if(result === null) {
              res.status(500);
              res.json({message : "Error"});      
            }
            res.status(200);
            res.json({message: "Ok"});
          }).catch(err => {
            res.status(500);
            res.json({message : err});    
          });
          
        }
        else {
          res.status(400);
          res.json({message : "Already exists"});
        }
      })
      .catch(err => {
        res.status(500);
        res.json({message : "Error"});
      });
    }
  );

  app.post("/api/auth/signin", auth.signin);
};
