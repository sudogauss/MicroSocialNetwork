const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//const checkLoginDuplication = require("./auth_check/check_if_signed_up");



const auth = require("./auth/auth");

const app = express();

/*let corsOptions = {
    origin: "http://localhost:4200"
};*/

app.use(cors());

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended: true}));

const db_manager = require('./db_models/db_manager');
const db_config = require('./config/mongoDB.config');
const Pangolin = db_manager.pangolin;

db_manager.driver
            .connect(`mongodb://${db_config.HOST}:${db_config.PORT}/${db_config.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connected"),
                create_pangolin();
            })
            .catch(err => {
                console.error("Nooooooon!!!!");
                process.exit();
            });

function create_pangolin() {
    Pangolin.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Pangolin({
                username: "test",
                password: "12345",
                age: 23,
                family: "test",
                race: "test",
                food: "test",
                friends: []
            }).save(err => {
                if(err) console.log(err);
                console.log("pangolin wants to eat!!!!");
            });
        }
    });
}


app.get("/", (req,res) => {
    res.json({ message: "Hello world!" });
});

require('./routes/data.routes')(app);

//require('./routes/auth.routes')(app);

/*app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });*/

  function checkLoginDuplication(username) {
    Pangolin.findOne({
      username: username
    }).exec((err, pangolin) => {
      if (err) {
        res.json({ message: err });
        return;
      }
  
      if (pangolin) {
        res.json({ message: "Pangolin already exists" });
        return;
      }
    });
  };

app.post( "/api/auth/signup", (req, res) => {
        checkLoginDuplication(req.body.username);
        auth.signup(req.body.username, req.body.password);
        res.json({body: "Ready"});
    });

//app.post("/api/auth/signin", auth.signin);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});