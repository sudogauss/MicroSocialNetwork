const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});