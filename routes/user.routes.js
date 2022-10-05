const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.post(
    "/api/test/user/order",
    [authJwt.verifyToken],
    controller.makeRequest
  );

  app.get(
    "/api/test/user/receipts",
    [authJwt.verifyToken],
    controller.getReceipts
  );

  app.get(
    "/api/test/user/receipts/receipt",
    [authJwt.verifyToken],
    controller.getOneReceipt
  );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/admin/orders",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOrders
  );
  
  app.get(
    "/api/test/admin/orders/order",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOrder
  );

  app.get(
    "/api/test/admin/order/process",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.processOrder
  );

};
