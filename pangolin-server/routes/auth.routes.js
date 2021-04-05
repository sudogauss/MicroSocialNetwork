const checkLoginDuplication = require("../auth_check/check_if_signed_up");
const auth = require("../auth/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      checkLoginDuplication
    ],
    auth.signup
  );

  app.post("/api/auth/signin", auth.signin);
};
