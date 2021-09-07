import express from "express";

const router = express.Router();

//import users from "../../app/controllers/user.controller";
const users = require("../controllers/user.controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("/users/");
  next();
});

router.get("/list", users.findAll);
router.get("/:id", users.findOne);

export default router;
